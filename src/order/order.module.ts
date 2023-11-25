import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { orderProviders } from './order.providers';
import { OrderController } from './order.controller';
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [ DatabaseModule ],
  providers: [ ...orderProviders, OrderService ],
  exports: [ OrderService ],
  controllers: [ OrderController ]
})
export class OrderModule {}
