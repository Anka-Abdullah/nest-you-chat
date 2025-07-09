// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  });

  app.setGlobalPrefix('api', {
    exclude: ['/', '/health', '/status'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
