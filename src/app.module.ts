import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './project/project.module';
import { ServiceModule } from './service/service.module';
import { ProxyModule } from './proxy/proxy.module'; // ✅ Smart proxy module
import { GlobalExceptionFilter } from './common/filters/prisma-exception.filter';

@Module({
  imports: [
    PrismaModule,
    ProjectModule,
    ServiceModule,
    ProxyModule, // ✅ Inject smart proxy logic
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
