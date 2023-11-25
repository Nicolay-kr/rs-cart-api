import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Carts, Status } from '../cart.entity';

@Injectable()
export class CartService {
  constructor(
    @Inject('CARTS_REPOSITORY')
    private cartsRepository: Repository<Carts>,
  ) {}

  async findAll(): Promise<Carts []> {
    return await this.cartsRepository.find({
      // where: { user_id: id },
      relations: {
        items: true,
      },
    });
  }

  async findByUserId(id: string): Promise<Carts> {
    const cart = await this.cartsRepository.findOne({
      where: { user_id: id },
      relations: {
        items: true,
      },
    });

    return cart;
  }

  createByUserId({ user_id, status }) {
    const cart: Carts = new Carts();
    cart.user_id = user_id;
    cart.status = status;

    return this.cartsRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string, status?: Status) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId({
      user_id: userId,
      status,
    });
  }

  async updateByUserId(
    userId: string,
    items: {
      product_id: string;
      count: number;
    }[],
  ) {
    const { id: cart_id, ...cart } = await this.findOrCreateByUserId(userId);

    cart.items = items.map(item => ({ ...item, cart_id }));

    return this.cartsRepository.save(cart);
  }

  removeByUserId(userId: string) {
    return this.cartsRepository.delete({ user_id: userId });
  }

}
