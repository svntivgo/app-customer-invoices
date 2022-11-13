import { IsString, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';
import { DetailDto } from './detail.dto';

export class InvoiceDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  detail: DetailDto[];
}
