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

  constructor(product: string, amount: number, unitPrice: number) {
    this.product = product;
    this.amount = amount;
    this.unitPrice = unitPrice;
  }
}
