import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DatabaseModule } from '../database/database.module';
import { cartProviders } from './cart.providers';
import { orderProviders } from '../order/order.providers';
import { OrderService } from '../order/services';


@Module({
  imports: [ DatabaseModule, OrderModule ],
  providers: [ ...cartProviders,...orderProviders, CartService, OrderService ],
  controllers: [ CartController ]
})
export class CartModule {}
