import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { config } from 'src/config/main.config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { VideosModule } from 'src/videos/videos.module';
import { validationSchema } from 'src/config/config.validation';
import { UtilsModule } from 'src/utils/utils.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      validationSchema,
      load: [config],
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
      sortSchema: true,
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    VideosModule,
    UtilsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
