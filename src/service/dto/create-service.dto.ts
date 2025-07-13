import { AuthMethod, ServiceMode } from '@prisma/client';
import {
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsUrl()
  baseUrl: string;

  @ApiProperty({ enum: ServiceMode, default: ServiceMode.PROXY })
  @IsEnum(ServiceMode)
  mode: ServiceMode;

  @ApiProperty({ enum: AuthMethod, default: AuthMethod.NONE })
  @IsEnum(AuthMethod)
  authMethod: AuthMethod;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  authToken?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cookieName?: string;

  @ApiProperty()
  @IsString()
  projectId: string;
}
