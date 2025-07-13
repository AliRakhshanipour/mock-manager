import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/prisma-exception.filter';
import { ServiceModule } from './service/service.module';


@Module({
  imports: [PrismaModule,ProjectModule,ServiceModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],})
export class AppModule {}
