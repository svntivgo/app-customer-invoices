import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Index,
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Index('tbl_detail_FK', ['idInvoice'], {})
@Entity('tbl_detail', { schema: 'customer-invoice' })
export class DetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'product', length: 100 })
  @IsString()
  @IsNotEmpty()
  product: string;

  @Column('int', { name: 'price' })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Column('int', { name: 'amount' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Column('int', { name: 'total' })
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @Column('int', { name: 'id_invoice' })
  idInvoice: number;

  @ManyToOne(() => InvoiceEntity, (invoiceEntity) => invoiceEntity.details, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn([{ name: 'id_invoice', referencedColumnName: 'id' }])
  invoice: InvoiceEntity;

  constructor(detail: DetailEntity) {
    if (detail) {
      this.product = detail.product ?? '';
      this.amount = detail.amount ?? '';
      this.price = detail.price ?? '';
      this.total = detail.total ?? '';
    }
  }
}
