import { IsString, IsNotEmpty, IsUUID, IsOptional } from "class-validator";
import { DetailDto } from './detail.dto';

export class InvoiceDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsOptional()
  detail: DetailDto[];
}
