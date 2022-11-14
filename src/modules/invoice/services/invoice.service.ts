import { Injectable } from '@nestjs/common';
import { invoiceDb } from '../../../db/invoices-db';
import { InvoiceDto } from '../models/invoice.dto';

@Injectable()
export class InvoiceService {
  invoices: InvoiceDto[] = invoiceDb;

  getInvoices(): InvoiceDto[] {
    return this.invoices;
  }

  getInvoiceById(id: string): InvoiceDto | string {
    const invoiceFound: InvoiceDto | undefined = this.invoices.find(
      (invoice) => invoice.id === id,
    );
    return invoiceFound ? invoiceFound : 'Not found';
  }

  newInvoice(invoice: InvoiceDto): InvoiceDto {
    const newInvoice = new InvoiceDto(invoice.date, invoice.detail);
    this.invoices.push(newInvoice);
    return newInvoice;
  }

  updateInvoice(id: string, invoiceNew: InvoiceDto): InvoiceDto | string {
    const invoice: InvoiceDto | undefined = this.invoices.find(
      (invoice) => invoice.id === id,
    );
    if (invoice) {
      invoice.date = invoiceNew.date;
      invoice.detail = invoiceNew.detail;
    }

    return invoice ? invoice : 'Not found';
  }

  updateInvoiceDate(id: string, newDate: string): InvoiceDto | string {
    if (typeof newDate !== 'string') return 'Invalid date';
    const invoice: InvoiceDto | undefined = this.invoices.find(
      (invoice) => invoice.id === id,
    );
    if (invoice) {
      invoice.date = newDate;
    }

    return invoice ? invoice : 'Not found';
  }
}
