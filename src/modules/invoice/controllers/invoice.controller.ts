import { Controller, Get } from '@nestjs/common';

@Controller('invoice')
export class InvoiceController {
  @Get()
  helloWorld(): string {
    return 'hello world';
  }
}
