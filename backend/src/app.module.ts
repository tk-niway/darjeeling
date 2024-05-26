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
import { AuthzModule } from 'src/authz/authz.module';
import { AuthzGuard } from 'src/authz/authz.guard';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
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
    AuthzModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthzGuard,
    },
    AppService,
  ],
})
export class AppModule {}
