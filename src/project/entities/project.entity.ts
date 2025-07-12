import { ArchitectureType } from '@prisma/client';

export class Project {
  id: string;
  name: string;
  description?: string;
  architectureType: ArchitectureType;
  createdAt: Date;
  updatedAt: Date;
}
