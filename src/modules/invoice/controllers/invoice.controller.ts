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
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/dto.filter';
import { AuthGuard } from 'src/guard/token.guard';
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
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  newInvoice(@Body() body: InvoiceDto): InvoiceDto {
    return this.invoiceService.newInvoice(body);
  }

  @Get(':id')
  getInvoiceById(@Param('id') id: string): InvoiceDto | string {
    return this.invoiceService.getInvoiceById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  updateInvoice(
    @Param('id') id: string,
    @Body() invoiceNew: InvoiceDto,
  ): InvoiceDto | string {
    return this.invoiceService.updateInvoice(id, invoiceNew);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  updateInvoiceDate(
    @Param('id') id: string,
    @Query('newDate') newDate: string,
  ): InvoiceDto | string {
    return this.invoiceService.updateInvoiceDate(id, newDate);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteInvoiceById(@Param('id') id: string): boolean {
    return this.invoiceService.deleteInvoiceById(id);
  }
}
