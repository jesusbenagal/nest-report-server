import { Module } from '@nestjs/common';

import { PrinterModule } from '../printer/printer.module';

import { BasicReportsService } from './basic-reports.service';

import { BasicReportsController } from './basic-reports.controller';

@Module({
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
  imports: [PrinterModule],
})
export class BasicReportsModule {}
