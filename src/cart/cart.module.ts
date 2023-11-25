import { Module } from '@nestjs/common';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { DatabaseModule } from '../database/database.module';
import { cartProviders } from './cart.providers';


@Module({
  imports: [ DatabaseModule, OrderModule ],
  providers: [ ...cartProviders, CartService ],
  controllers: [ CartController ]
})
export class CartModule {}
