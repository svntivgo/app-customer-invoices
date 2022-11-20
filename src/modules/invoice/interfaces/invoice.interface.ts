import { DetailEntity } from '../entities/detail.entity';

export interface Invoice {
  id?: number;
  date?: Date;
  details: DetailEntity[];
}
