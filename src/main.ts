import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('Mock Manager API')
    .setDescription('API documentation for the Mock Manager app')
    .setVersion('1.0')
    .addBearerAuth() // optional: if you're using auth
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document); // Swagger UI at /docs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
