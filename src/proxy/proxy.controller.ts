import {
    All,
    Controller,
    Headers,
    Req,
    Res,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  import { ProxyService } from './proxy.service';
  
  @Controller()
  export class ProxyController {
    constructor(private readonly proxyService: ProxyService) {}
  
    @All('*')
    async handleAllRequests(
      @Req() req: Request,
      @Res() res: Response,
      @Headers('host') hostHeader: string,
      @Headers('x-target-host') xTargetHost?: string,
    ) {
      const finalHost = xTargetHost || hostHeader;
      const result = await this.proxyService.handleRequest(req, finalHost);
      res.status(result.status).set(result.headers).send(result.body);
    }
  }
  