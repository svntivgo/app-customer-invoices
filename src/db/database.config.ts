import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CustomerEntity } from '../modules/customer/entities/customer.entity';
import { InvoiceEntity } from '../modules/invoice/entities/invoice.entity';
import { DetailEntity } from '../modules/invoice/entities/detail.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'test',
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  entities: [CustomerEntity, InvoiceEntity, DetailEntity],
  synchronize: true,
  logging: false,
  // autoLoadEntities: true,
};
