import { ArchitectureType } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'Project name (max 100 chars)',
    maxLength: 100,
    example: 'My Cool Project',
  })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiPropertyOptional({
    description: 'Optional description for the project',
    example: 'This project is a proxy/cache/mock manager',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Type of architecture',
    enum: ArchitectureType,
    example: ArchitectureType.MONOLITH,
  })
  @IsOptional()
  @IsEnum(ArchitectureType)
  architectureType?: ArchitectureType;
}
