import { InvoiceEntity } from 'src/modules/invoice/entities/invoice.entity';

export interface Customer {
  id: number;
  name: string;
  email?: string;
  invoices?: InvoiceEntity[];
}
