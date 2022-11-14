import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerDto } from '../models/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getInvoices(): CustomerDto[] {
    return this.customerService.getCustomers();
  }

  @Post()
  newCustomer(@Body() body: CustomerDto): CustomerDto {
    return this.customerService.newCustomer(body);
  }

  @Get(':id')
  getCustomerById(@Param('id') id: string): CustomerDto | string {
    return this.customerService.getCustomerById(id);
  }

  @Put(':id')
  updateCustomer(
    @Param('id') id: string,
    @Body() customerNew: CustomerDto,
  ): CustomerDto | string {
    return this.customerService.updateCustomer(id, customerNew);
  }

  @Patch(':id')
  updateCustomerMail(
    @Param('id') id: string,
    @Query('newEmail') newEmail: string,
  ): CustomerDto | string {
    return this.customerService.updateCustomerEmail(id, newEmail);
  }

  @Delete(':id')
  deleteCustomerById(@Param('id') id: string): boolean {
    return this.customerService.deleteCustomerById(id);
  }
}
