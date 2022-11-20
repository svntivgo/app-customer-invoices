import { IsArray, IsNotEmpty, IsObject } from 'class-validator';
import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { DetailEntity } from './detail.entity';
import { CustomerEntity } from '../../customer/entities/customer.entity';

@Index('tbl_invoice_FK', ['idCustomer'], {})
@Entity('tbl_invoice', { schema: 'customer-invoice' })
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('timestamp', {
    name: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date: Date;

  @OneToMany(() => DetailEntity, (detailEntity) => detailEntity.invoice, {
    cascade: ['insert', 'update'],
    onDelete: 'RESTRICT',
  })
  @IsArray()
  details: DetailEntity[];

  @Column('int', { name: 'id_customer' })
  idCustomer: number;

  @ManyToOne(
    () => CustomerEntity,
    (customerEntity) => customerEntity.invoices,
    {
      cascade: ['insert', 'update'],
      onDelete: 'RESTRICT',
    },
  )
  @JoinColumn([{ name: 'id_customer', referencedColumnName: 'id' }])
  @IsNotEmpty()
  @IsObject()
  customer: CustomerEntity;

  constructor(details: DetailEntity[], customer: CustomerEntity) {
    this.details = details;
    this.customer = customer;
    this.date = new Date();
  }
}
