import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from 'src/app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  // const app = await NestFactory.create(AppModule); # Express.js
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { cors: true },
  );

  // NOTE - Uncomment this line to enable the global filter
  // app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port, '0.0.0.0');

  console.log('🚀App is running on port:', port);
}

bootstrap();
