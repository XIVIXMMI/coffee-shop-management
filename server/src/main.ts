import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  app.enableCors({
    origin: 'http://localhost:3001/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
});
}
bootstrap();
