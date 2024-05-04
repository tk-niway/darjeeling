import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from 'src/app.module';
import { AllExceptionsFilter } from 'src/exceptions/all-exception.filter';

const port = process.env.PORT || 3000;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule); # Express.js
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port, '0.0.0.0');

  console.log('🚀App is running on port:', port);
}

bootstrap();
