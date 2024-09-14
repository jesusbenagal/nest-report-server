import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrinterService } from '../printer/printer.service';

import {
  getHelloWorldReport,
  getEmploymentLetterReport,
  getEmploymentLetterByIdReport,
  getCountryReport,
} from '../reports';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(BasicReportsService.name);

  constructor(private readonly printerService: PrinterService) {
    super();
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('Connected to the database');
  }
  helloWorld() {
    const docDefinition = getHelloWorldReport({ name: 'John Doe' });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async employmentLetterById(id: number) {
    const employee = await this.employees.findUnique({
      where: { id },
    });

    if (!employee)
      throw new NotFoundException(`Employee with id ${id} not found`);

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Jane Doe',
      employerPosition: 'HR Manager',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Coprp.',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountriesReport() {
    const countries = await this.countries.findMany({
      where: {
        local_name: { not: null },
      },
    });

    const docDefinition = getCountryReport({ countries });

    return this.printerService.createPdf(docDefinition);
  }
}
