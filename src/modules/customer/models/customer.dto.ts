import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEmail,
  IsOptional,
} from 'class-validator';
import { InvoiceDto } from '../../invoice/models/invoice.dto';
export class CustomerDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
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
