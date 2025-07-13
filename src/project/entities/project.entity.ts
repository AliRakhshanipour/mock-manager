import { ApiProperty } from '@nestjs/swagger';
import { ArchitectureType } from '@prisma/client';

export class ProjectEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true }) // ✅ fix here
  description: string | null;

  @ApiProperty({ enum: ArchitectureType })
  architectureType: ArchitectureType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
