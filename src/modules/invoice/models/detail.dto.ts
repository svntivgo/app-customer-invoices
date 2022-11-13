import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DetailDto {
  @IsString()
  @IsNotEmpty()
  product: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsNumber()
  @IsNotEmpty()
  unitPrice: number;
}
