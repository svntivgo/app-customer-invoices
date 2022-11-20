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
import { InvoiceEntity } from '../entities/invoice.entity';
import { InvoiceService } from '../services/invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  getInvoices(): Promise<InvoiceEntity[]> {
    return this.invoiceService.getInvoices();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  newInvoice(@Body() body: InvoiceEntity): Promise<InvoiceEntity> {
    return this.invoiceService.newInvoice(body);
  }

  @Get(':id')
  getInvoiceById(@Param('id') id: number): Promise<InvoiceEntity> {
    return this.invoiceService.getInvoiceById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  updateInvoice(
    @Param('id') id: number,
    @Body() body: InvoiceEntity,
  ): Promise<InvoiceEntity> {
    return this.invoiceService.updateInvoice(id, body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  patchInvoiceDate(
    @Param('id') id: number,
    @Body() body: InvoiceEntity,
  ): Promise<InvoiceEntity> {
    return this.invoiceService.patchInvoice(id, body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteInvoiceById(@Param('id') id: number): Promise<boolean> {
    return this.invoiceService.deleteInvoiceById(id);
  }
}
