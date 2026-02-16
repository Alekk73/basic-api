import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

let port: number;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService();
  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe());

  port = Number(config.get<number>('PORT'));
  await app.listen(port);
}
bootstrap()
  .then(() => {
    console.log(
      `Application started successfully on http://localhost:${port}/api`,
    );
  })
  .catch((error) => {
    console.error('Failed application:', error);
  });
