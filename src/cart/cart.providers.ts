import { DataSource } from 'typeorm';
import { Carts } from './cart.entity';

export const cartProviders = [
  {
    provide: 'CARTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Carts),
    inject: ['DATA_SOURCE'],
  },
];