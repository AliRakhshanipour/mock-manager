import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Request } from 'express';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { computeRequestHash, normalizeHeaders } from './proxy.utils';
import { ServiceMode } from '@prisma/client';

@Injectable()
export class ProxyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async handleRequest(req: Request, host: string) {
    const method = req.method as any;
    const path = req.path;

    // ✅ Find the matched service by host
    const service = await this.prisma.service.findFirst({
      where: { baseUrl: { contains: host } },
    });

    if (!service) {
      throw new NotFoundException(`No service found for host: ${host}`);
    }

    // ✅ Find endpoint and include manual response
    const endpoint = await this.prisma.endpoint.findFirst({
      where: { serviceId: service.id, path, method },
      include: {
        manualResponse: true,
      },
    });

    if (!endpoint) {
      throw new NotFoundException(`No endpoint found for ${method} ${path}`);
    }

    // ✅ Normalize headers and generate hash
    const headers = normalizeHeaders(req.headers);
    const hash = computeRequestHash(method, headers, req.query, req.body);

    // ✅ Check if the request has been seen before
    const existingRequest = await this.prisma.request.findUnique({
      where: { hash },
      include: {
        responses: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    // ====== MOCK Mode ======
    if (service.mode === ServiceMode.MOCK && endpoint.manualResponse) {
      return {
        status: endpoint.manualResponse.statusCode,
        headers: endpoint.manualResponse.headers,
        body: endpoint.manualResponse.body,
      };
    }

    // ====== CACHE Mode ======
    if (service.mode === ServiceMode.CACHE && existingRequest?.responses?.length) {
      const cached = existingRequest.responses[0];
      return {
        status: cached.statusCode,
        headers: cached.headers,
        body: cached.body,
      };
    }

    // ====== PROXY Mode / Default Fallback ======
    const targetUrl = `${service.baseUrl}${req.originalUrl}`;
    const proxyRes = await firstValueFrom(
      this.http.request({
        url: targetUrl,
        method,
        headers: headers as any,
        data: req.body,
        validateStatus: () => true,
      }),
    );

    // ✅ Save request
    const dbReq = await this.prisma.request.upsert({
      where: { hash },
      create: {
        endpointId: endpoint.id,
        hash,
        headers,
        query: req.query,
        body: req.body,
      },
      update: {
        updatedAt: new Date(),
      },
    });

    // ✅ Save response
    await this.prisma.response.create({
      data: {
        requestId: dbReq.id,
        statusCode: proxyRes.status,
        headers: proxyRes.headers,
        body: proxyRes.data,
        isFromCache: false,
        isManual: false,
      },
    });

    return {
      status: proxyRes.status,
      headers: proxyRes.headers,
      body: proxyRes.data,
    };
  }
}
