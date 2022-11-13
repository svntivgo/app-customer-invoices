import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { randomUUID } from 'crypto';
import { InvoiceDto } from '../../invoice/models/invoice.dto';
export class CustomerDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  invoices?: InvoiceDto[];

  constructor(name: string, email: string, invoices: InvoiceDto[]) {
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.invoices = invoices;
  }
}
