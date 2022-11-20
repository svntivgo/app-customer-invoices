import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities/customer.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(private dataSource: DataSource) {}

  customers: CustomerEntity[];

  async getCustomers(): Promise<CustomerEntity[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const customers = await queryRunner.manager.find(CustomerEntity);
      await queryRunner.commitTransaction();
      return customers;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async getCustomerById(id: number): Promise<CustomerEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const customer = await queryRunner.manager.findOneByOrFail(
        CustomerEntity,
        {
          id: id,
        },
      );
      await queryRunner.commitTransaction();
      return customer;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async newCustomer(customer: CustomerEntity): Promise<CustomerEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newCustomer = await queryRunner.manager.save(customer);
      await queryRunner.commitTransaction();
      return Promise.resolve(newCustomer);
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async updateCustomer(
    id: number,
    customerNew: CustomerEntity,
  ): Promise<CustomerEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const customer = await queryRunner.manager.findOneByOrFail(
        CustomerEntity,
        {
          id: customerNew.id,
        },
      );
      if (customerNew.name && customerNew.email) {
        await queryRunner.commitTransaction();
        if (customerNew.name) customer.name = customerNew.name;
        if (customerNew.email) customer.email = customerNew.email;
        if (customerNew.invoices) customer.invoices = customerNew.invoices;
      }
      return customer;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async patchCustomer(
    id: number,
    customerNew: CustomerEntity,
  ): Promise<CustomerEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const customer = await queryRunner.manager.findOneByOrFail(
        CustomerEntity,
        {
          id: customerNew.id,
        },
      );
      await queryRunner.commitTransaction();
      if (customerNew.name) customer.name = customerNew.name;
      if (customerNew.email) customer.email = customerNew.email;
      if (customerNew.invoices) customer.invoices = customerNew.invoices;
      return customer;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async deleteCustomerById(id: number): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.query(
        `DELETE x.* FROM tbl_customer x WHERE id = ${id}`,
      );
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
