import { IsString, IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceEntity } from '../../invoice/entities/invoice.entity';

@Entity('tbl_customer', { schema: 'customer-invoice' })
export class CustomerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column('varchar', { name: 'email', length: 100 })
  @IsString()
  @IsOptional()
  email: string | null;

  @OneToMany(() => InvoiceEntity, (invoiceEntity) => invoiceEntity.customer, {
    cascade: ['insert', 'update'],
  })
  @IsOptional()
  @IsArray()
  invoices?: InvoiceEntity[];

  constructor(
    name: string,
    email?: string,
    id?: number,
    invoices?: InvoiceEntity[],
  ) {
    if (id) this.id = id;
    if (name) this.name = name;
    if (email) this.email = email;
    if (invoices) this.invoices = invoices;
  }
}
