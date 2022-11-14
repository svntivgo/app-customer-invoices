import { IsString, IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';
import { DetailDto } from './detail.dto';

export class InvoiceDto {
  id: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsNotEmpty()
  detail: DetailDto[];

  constructor(date: string, detail: DetailDto[]) {
    this.id = randomUUID();
    this.date = date;
    this.detail = detail;
  }
}
