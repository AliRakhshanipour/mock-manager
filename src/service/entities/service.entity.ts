import { ApiProperty } from '@nestjs/swagger';
import { AuthMethod, ServiceMode } from '@prisma/client';

export class ServiceEntity {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  baseUrl: string;

  @ApiProperty({ enum: ServiceMode })
  mode: ServiceMode;

  @ApiProperty({ enum: AuthMethod })
  authMethod: AuthMethod;

  @ApiProperty()
  authToken?: string;

  @ApiProperty()
  cookieName?: string;

  @ApiProperty()
  projectId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
