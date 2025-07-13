import { IsEnum, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { AuthMethod, ServiceMode } from '@prisma/client';

export class CreateServiceDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsUrl()
  baseUrl: string;

  @IsEnum(ServiceMode)
  @IsOptional()
  mode?: ServiceMode = ServiceMode.PROXY;

  @IsEnum(AuthMethod)
  @IsOptional()
  authMethod?: AuthMethod = AuthMethod.NONE;

  @IsOptional()
  @IsString()
  authToken?: string;

  @IsOptional()
  @IsString()
  cookieName?: string;

  @IsString()
  projectId: string;
}
