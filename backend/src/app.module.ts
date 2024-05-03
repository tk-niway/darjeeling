import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UsersModule } from 'src/users/users.module';
import { AuthzModule } from 'src/authz/authz.module';
import { AuthzGuard } from 'src/authz/authz.guard';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      graphiql: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
      sortSchema: true,
    }),
    PrismaModule,
    UsersModule,
    AuthzModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthzGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService,
    PrismaService,
  ],
})
export class AppModule {}
