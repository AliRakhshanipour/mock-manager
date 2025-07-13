import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS (customize as needed)
  app.enableCors();

  // ✅ Global ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,       // strips unexpected properties
      forbidNonWhitelisted: false,
      transform: true,       // auto-transform types (e.g., query strings to numbers)
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // ✅ Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Mock Manager API')
    .setDescription('API documentation for the Mock Manager app')
    .setVersion('1.0')
    .addBearerAuth() // Include this if using auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Available at /docs

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`🚀 App is running on: http://localhost:${port}`);
  console.log(`📘 Swagger docs:     http://localhost:${port}/docs`);
}
bootstrap();
