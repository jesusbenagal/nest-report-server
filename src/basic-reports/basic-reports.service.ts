import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(BasicReportsService.name);

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }
  async helloWorld() {
    return this.employees.findFirst();
  }
}
