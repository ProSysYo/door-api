import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

@Injectable()
export class DbService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL as string,
    });
    super({ adapter });
  }
  async onModuleInit() {
    // Принудительное подключение при старте приложения (опционально, но полезно для отладки)
    await this.$connect();
    console.log('✅ База данных успешно подключена');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
