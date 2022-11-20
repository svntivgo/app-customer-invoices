import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from '../services/customer.service';
import { CustomerEntity } from '../entities/customer.entity';
import { HttpExceptionFilter } from 'src/filters/dto.filter';
import { AuthGuard } from 'src/guard/token.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get()
  getInvoices(): Promise<CustomerEntity[]> {
    return this.customerService.getCustomers();
  }

  @Post()
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  async newCustomer(@Body() body: CustomerEntity): Promise<CustomerEntity> {
    const customer = new CustomerEntity(body.name, body.email ?? undefined);
    return this.customerService.newCustomer(customer);
  }

  @Get(':id')
  getCustomerById(@Param('id') id: number): Promise<CustomerEntity> {
    return this.customerService.getCustomerById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  updateCustomer(
    @Param('id') id: number,
    @Body() customerNew: CustomerEntity,
  ): Promise<CustomerEntity> {
    return this.customerService.updateCustomer(id, customerNew);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseFilters(new HttpExceptionFilter())
  patchCustomer(
    @Param('id') id: number,
    @Body() customerNew: CustomerEntity,
  ): Promise<CustomerEntity> {
    return this.customerService.patchCustomer(id, customerNew);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deleteCustomerById(@Param('id') id: number): Promise<boolean> {
    return this.customerService.deleteCustomerById(id);
  }
}
