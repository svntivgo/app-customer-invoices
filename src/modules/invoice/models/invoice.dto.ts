import { IsString, IsNotEmpty } from 'class-validator';
import { DetailDto } from './detail.dto';

export class InvoiceDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  detail: DetailDto[];
}
