import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class DetailDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  product: string;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  amount: number;
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}
