import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Prisma } from '@prisma/client';
  import { Response } from 'express';
  
  @Catch()
  export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
  
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
  
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const res = exception.getResponse();
        message = typeof res === 'string' ? res : (res as any).message || JSON.stringify(res);
      }
      else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
        switch (exception.code) {
          case 'P2002':
            status = HttpStatus.BAD_REQUEST;
            message = 'Duplicate record violation';
            break;
          case 'P2025':
            status = HttpStatus.NOT_FOUND;
            message = 'Record not found';
            break;
          default:
            message = `Database error: ${exception.message}`;
        }
      } else if (exception instanceof Prisma.PrismaClientValidationError) {
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid data input';
      } else if (exception instanceof Error) {
        message = exception.message;
      }
  
      this.logger.error(`[${status}] ${JSON.stringify(message)}`);
  
      response.status(status).json({
        statusCode: status,
        message,
        timestamp: new Date().toISOString(),
      });
    }
  }
  