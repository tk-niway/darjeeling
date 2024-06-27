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
import { PrismaExceptionFilter } from 'src/common/exceptions/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const configService: ConfigService<IConfig, true> = app.get(ConfigService);

  const port = configService.get<number>('port');

  app.useGlobalFilters(new PrismaExceptionFilter());

  app.enableCors({
    origin: configService.get<string>('frontendUrl'),
    methods: '*',
    allowedHeaders: '*',
  });

  app.register(mercuriusUpload);

  app.register(fastifyStatic, {
    root: configService.get('publicDirPath'),
    prefix: configService.get('publicDirPrefix'),
    decorateReply: true,
  });

  await app.listen(port, '0.0.0.0');

  console.log('🚀App is running on port:', port);
}

bootstrap();
