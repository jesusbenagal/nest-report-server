import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { Response } from 'express';

@Controller('basic-reports')
export class BasicReportsController {
  constructor(private readonly basicReportsService: BasicReportsService) {}

  @Get()
  helloWorld(@Res() res: Response) {
    const pdfDoc = this.basicReportsService.helloWorld();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employment-letter')
  employmentLetter(@Res() res: Response) {
    const pdfDoc = this.basicReportsService.employmentLetter();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('employment-letter/:id')
  async employmentLetterById(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const pdfDoc = await this.basicReportsService.employmentLetterById(id);

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Employment Letter';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('countries')
  async getCountriesReport(@Res() res: Response) {
    const pdfDoc = await this.basicReportsService.getCountriesReport();

    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Countries Report';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }
}
