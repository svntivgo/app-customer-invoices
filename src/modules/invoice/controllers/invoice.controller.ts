import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { InvoiceDto } from '../models/invoice.dto';
import { InvoiceService } from '../services/invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getInvoices(): InvoiceDto[] {
    return this.invoiceService.getInvoices();
  }

  @Post()
  newInvoice(@Body() body: InvoiceDto): InvoiceDto {
    return this.invoiceService.newInvoice(body);
  }

  @Get(':id')
  getInvoiceById(@Param('id') id: string): InvoiceDto | string {
    return this.invoiceService.getInvoiceById(id);
  }

  @Put(':id')
  updateInvoice(
    @Param('id') id: string,
    @Body() invoiceNew: InvoiceDto,
  ): InvoiceDto | string {
    return this.invoiceService.updateInvoice(id, invoiceNew);
  }

  @Patch(':id')
  updateInvoiceDate(
    @Param('id') id: string,
    @Query('newDate') newDate: string,
  ): InvoiceDto | string {
    return this.invoiceService.updateInvoiceDate(id, newDate);
  }

  @Delete(':id')
  deleteInvoiceById(@Param('id') id: string): boolean {
    return this.invoiceService.deleteInvoiceById(id);
  }
}
