import { Controller, Get } from '@nestjs/common';

@Controller('customer')
export class CustomerController {
  @Get()
  helloWorld(): string {
    return 'hello world';
  }
}
