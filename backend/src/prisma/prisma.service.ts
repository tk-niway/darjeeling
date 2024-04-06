import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mysql://root:password@localhost:3306/darjeeling',
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
