import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import mercuriusUpload from 'mercurius-upload';
import { ConfigService } from '@nestjs/config';
import fastifyStatic from '@fastify/static';
import { AppModule } from 'src/app.module';
import { IConfig } from 'src/config/config.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const configService: ConfigService<IConfig, true> = app.get(ConfigService);
  const port = configService.get<number>('port');
  // NOTE - Uncomment this line to enable the global filter
  // app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: configService.get<string>('frontendUrl'),
    methods: '*',
    allowedHeaders: '*',
  });
  app.register(mercuriusUpload);
  app.register(fastifyStatic, {
    root: configService.get('filepath.publicFileDir', { infer: true }),
    prefix: configService.get('filepath.publicFilesPrefix', { infer: true }),
    decorateReply: true,
  });

  await app.listen(port, '0.0.0.0');

  console.log('🚀App is running on port:', port);
}

bootstrap();
