import { CustomerDto } from './customer.entity';

describe('CustomerDto', () => {
  it('should be defined', () => {
    expect(new CustomerDto()).toBeDefined();
  });
});
