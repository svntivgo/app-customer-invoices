import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { InvoiceEntity } from './entities/invoice.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailEntity } from './entities/detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity, DetailEntity])],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
