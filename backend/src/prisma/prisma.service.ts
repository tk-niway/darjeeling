import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    const { port, host, username, password, database, provider } =
      configService.get('db');

    super({
      datasources: {
        db: {
          url: `${provider}://${username}:${password}@${host}:${port}/${database}`,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
