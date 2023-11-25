import { DataSource } from 'typeorm';
import { Orders } from './order.entity';

export const orderProviders = [
  {
    provide: 'ORDERS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Orders),
    inject: ['DATA_SOURCE'],
  },
];