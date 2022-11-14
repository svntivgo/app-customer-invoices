import { InvoiceDto } from '../modules/invoice/models/invoice.dto';

const invoices: InvoiceDto[] = [];
const invoice1: InvoiceDto = new InvoiceDto('2020', [
  { product: 'manzana', amount: 2, unitPrice: 2 },
  { product: 'pera', amount: 1, unitPrice: 4 },
  { product: 'papa', amount: 5, unitPrice: 3 },
]);
const invoice2: InvoiceDto = new InvoiceDto('2022', [
  { product: 'fresa', amount: 2, unitPrice: 2 },
  { product: 'manzana', amount: 1, unitPrice: 4 },
  { product: 'platano', amount: 5, unitPrice: 3 },
]);

invoices.push(invoice1);
invoices.push(invoice2);

export const invoiceDb = invoices;
