import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,POST, DELETE, PUT, PATCH',
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
