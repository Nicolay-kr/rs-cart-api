// import { Injectable } from '@nestjs/common';
// import { v4 } from 'uuid';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Orders, Status } from '../order.entity';

// import { Order } from '../models';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDERS_REPOSITORY')
    private ordersRepository: Repository<Orders>,
  ) {}

  async findAll(): Promise<Orders []> {
    return await this.ordersRepository.find({
    });
  }

  async findById(orderId: string): Promise<Orders>  {
    const order = await this.ordersRepository.findOne({
      where: { id: orderId },
    });

    return order;
  }

  async findByUser(user_id): Promise<Orders[]> {
    return await this.ordersRepository.find({
      where: { user_id: user_id },
    });
  }

  async findByCart(cart_id): Promise<Orders> {
    return await this.ordersRepository.findOne({
      where: { cart_id },
    });
  }

  async createOrder(data: any) {
    const order: Orders = new Orders();
    order.user_id = data.userId;
    order.cart_id = data.cartId;
    order.status = Status.IN_PROGRESS;

    return await this.ordersRepository.save(order);
  }

  removeById(id: string) {
    return this.ordersRepository.delete({ id });
  }

  async updateById(id, data) {
    let order = await this.findById(id);
    if (order){
      order = {...order,...data}
      await this.ordersRepository.save(order);
    }else{
      return null
    }

    return order
  }
}
