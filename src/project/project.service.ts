import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project as PrismaProject } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProjectDto): Promise<PrismaProject> {
    return this.prisma.project.create({ data });
  }

  async findAll(): Promise<PrismaProject[]> {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<PrismaProject> {
    const project = await this.prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      throw new NotFoundException(`Project with ID '${id}' not found`);
    }

    return project;
  }

  async update(id: string, data: UpdateProjectDto): Promise<PrismaProject> {
    await this.findOne(id); // throw if not found
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<PrismaProject> {
    await this.findOne(id); // validate existence
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
