import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { CustomerModule } from './modules/customer/customer.module';
import { RequestMiddleware } from './middlewares/request.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './db/database.config';

@Module({
  imports: [
    InvoiceModule,
    CustomerModule,
    TypeOrmModule.forRoot(databaseConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMiddleware).forRoutes('customer');
  }
}
