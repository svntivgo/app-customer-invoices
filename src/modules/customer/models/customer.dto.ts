import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
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
  invoices: InvoiceDto[];
}
