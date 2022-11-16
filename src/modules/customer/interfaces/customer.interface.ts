import { InvoiceDto } from 'src/modules/invoice/models/invoice.dto';

export interface Customer {
  id: string;
  name: string;
  email?: string;
  invoices?: InvoiceDto[];
}
