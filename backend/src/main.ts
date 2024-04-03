import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule); # Express.js
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  console.log('🚀App is running on port:', port);

  await app.listen(port, '0.0.0.0');
}

bootstrap();
