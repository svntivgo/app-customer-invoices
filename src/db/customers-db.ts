import { CustomerDto } from '../modules/customer/models/customer.dto';
import { invoiceDb } from './invoices-db';
import { InvoiceDto } from '../modules/invoice/models/invoice.dto';

const customers: CustomerDto[] = [];
const invoices: InvoiceDto[] = invoiceDb;

const customer1: CustomerDto = new CustomerDto(
  'John',
  'john@email.com',
  invoices,
);
const customer2: CustomerDto = new CustomerDto(
  'Mary',
  'mary@email.com',
  invoices,
);

customers.push(customer1);
customers.push(customer2);

export const customerDb = customers;
