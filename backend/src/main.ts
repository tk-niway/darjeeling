import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import mercuriusUpload from 'mercurius-upload';
import { AppModule } from 'src/app.module';
import { ConfigService } from '@nestjs/config';
import fastifyStatic from '@fastify/static';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
    { cors: true },
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  // NOTE - Uncomment this line to enable the global filter
  // app.useGlobalFilters(new AllExceptionsFilter());

  app.register(mercuriusUpload);
  app.register(fastifyStatic, {
    root: configService.get('filepath.publicFiles'),
    prefix: configService.get('filepath.publicFilesPrefix'),
    decorateReply: true,
  });
  await app.listen(port, '0.0.0.0');

  console.log('🚀App is running on port:', port);
}

bootstrap();
