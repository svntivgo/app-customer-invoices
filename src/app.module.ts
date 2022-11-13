import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { CustomerModule } from './modules/customer/customer.module';

@Module({
  imports: [InvoiceModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
