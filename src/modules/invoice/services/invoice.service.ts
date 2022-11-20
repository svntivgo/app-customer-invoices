import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { InvoiceEntity } from '../entities/invoice.entity';
import { DetailEntity } from '../entities/detail.entity';

@Injectable()
export class InvoiceService {
  constructor(private dataSource: DataSource) {}
  invoices: InvoiceEntity[];

  async getInvoices(): Promise<InvoiceEntity[]> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const invoices = await queryRunner.manager.find(InvoiceEntity);
      return invoices;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.NO_CONTENT);
    }
  }

  async getInvoiceById(id: number): Promise<InvoiceEntity> {
    const detalles: DetailEntity[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const invoice = await queryRunner.manager.findOneByOrFail(InvoiceEntity, {
        id: id,
      });
      const detailsByInvoice = await queryRunner.manager.query(
        `SELECT x.* FROM test.tbl_detail x WHERE id_invoice = ${id}`,
      );

      const customerByInvoice = await queryRunner.manager.query(
        `SELECT x.* FROM test.tbl_customer x WHERE id = ${invoice.idCustomer}`,
      );

      detailsByInvoice.forEach((detail: DetailEntity) => {
        const newDetail = new DetailEntity(detail);
        detalles.push(newDetail);
      });

      invoice.details = detalles;
      invoice.customer = customerByInvoice;
      return invoice;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err.message);
      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  async newInvoice(invoice: InvoiceEntity): Promise<InvoiceEntity> {
    const newInvoice = new InvoiceEntity(invoice.details, invoice.customer);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newFactura = await queryRunner.manager.save(newInvoice);
      await queryRunner.commitTransaction();
      return Promise.resolve(newFactura);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async updateInvoice(
    id: number,
    invoiceNew: InvoiceEntity,
  ): Promise<InvoiceEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const invoice = await queryRunner.manager.findOneByOrFail(InvoiceEntity, {
        id: invoiceNew.id,
      });
      if (invoiceNew.date && invoiceNew.idCustomer) {
        await queryRunner.commitTransaction();
        if (invoiceNew.date) invoice.date = invoiceNew.date;
        if (invoiceNew.idCustomer) invoice.idCustomer = invoiceNew.idCustomer;
      }
      return invoice;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async patchInvoice(
    id: number,
    invoiceNew: InvoiceEntity,
  ): Promise<InvoiceEntity> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const invoice = await queryRunner.manager.findOneByOrFail(InvoiceEntity, {
        id: invoiceNew.id,
      });
      await queryRunner.commitTransaction();
      if (invoiceNew.date) invoice.date = invoiceNew.date;
      if (invoiceNew.idCustomer) invoice.idCustomer = invoiceNew.idCustomer;
      return invoice;
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }

  async deleteInvoiceById(id: number): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.query(
        `DELETE x.* FROM test.tbl_detail x WHERE id_invoice = ${id}`,
      );
      await queryRunner.manager.query(
        `DELETE x.* FROM test.tbl_invoice x WHERE id = ${id}`,
      );
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
