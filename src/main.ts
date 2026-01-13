/* eslint-disable @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Event Management System')
    .setDescription('Backend REST API for simple event management, built using NestJS as part of an internship technical assessment. This project focuses on authentication, authorization, API design, and testability rather than feature breadth.')
    .setVersion('1.0.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      authAction: {
        JWT: {
          name: 'JWT',
          schema: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
          value: 'Bearer <JWT>',
        },
      },
    },
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
