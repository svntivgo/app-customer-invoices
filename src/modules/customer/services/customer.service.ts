import { customerDb } from './../../../db/customers-db';
import { Injectable } from '@nestjs/common';
import { CustomerDto } from '../models/customer.dto';

@Injectable()
export class CustomerService {
  customers: CustomerDto[] = customerDb;

  getCustomers(): CustomerDto[] {
    return this.customers;
  }

  getCustomerById(id: string): CustomerDto | string {
    const customerFound: CustomerDto | undefined = this.customers.find(
      (customer) => customer.id === id,
    );
    return customerFound ? customerFound : 'Not found';
  }

  newCustomer(customer: CustomerDto): CustomerDto {
    const newCustomer = new CustomerDto(
      customer.name,
      customer.email,
      customer.invoices ? customer.invoices : [],
    );
    this.customers.push(newCustomer);
    return newCustomer;
  }

  updateCustomer(id: string, customerNew: CustomerDto): CustomerDto | string {
    const customer: CustomerDto | undefined = this.customers.find(
      (customer) => customer.id === id,
    );
    if (customer) {
      customer.name = customerNew.name;
      customer.email = customerNew.email;
    }

    return customer ? customer : 'Not found';
  }

  updateCustomerEmail(id: string, newEmail: string): CustomerDto | string {
    const customer: CustomerDto | undefined = this.customers.find(
      (customer) => customer.id === id,
    );
    if (customer) {
      customer.email = newEmail;
    }

    return customer ? customer : 'Not found';
  }
}
