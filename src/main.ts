import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

import { HttpExceptionFilter } from './common/http-exception/http-exception.filter';
import { LoggingInterceptor } from './common/logging/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  app.useGlobalInterceptors(
    new LoggingInterceptor(),
  );

  const config = new DocumentBuilder()
    .setTitle('Inventory API')
    .setDescription('Inventory Management Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
  );

  SwaggerModule.setup(
    'api',
    app,
    document,
  );

  await app.listen(3000);
}

bootstrap();