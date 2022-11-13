import { Body, Controller, Get, Post } from '@nestjs/common';
import { brotliDecompressSync } from 'zlib';
import { DetailDto } from '../models/detail.dto';

@Controller('invoice')
export class InvoiceController {
  @Post()
  helloWorld(@Body() body: DetailDto): DetailDto {
    return body;
  }
}
