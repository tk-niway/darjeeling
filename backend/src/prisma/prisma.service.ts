import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: `${configService.get('DB_PROVIDER')}://${configService.get(
            'DB_USERNAME',
          )}:${configService.get('DB_PASSWORD')}@${configService.get(
            'DB_HOST',
          )}/${configService.get('DB_NAME')}`,
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
