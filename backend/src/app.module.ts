import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
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
    }),
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'storage', 'public'),
      serveRoot: '/files',
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
    PrismaService,
  ],
})
export class AppModule {}
