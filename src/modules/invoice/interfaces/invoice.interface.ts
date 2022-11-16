import { DetailDto } from '../models/detail.dto';

export interface Invoice {
  id: string;
  date: string;
  detail: DetailDto[];
}
