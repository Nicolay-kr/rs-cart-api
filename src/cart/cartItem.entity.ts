import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carts } from './cart.entity';

@Entity()
export class CartItems {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column('uuid')
  cart_id: string;

  @Column('numeric')
  count: number;

  @ManyToOne(
    () => Carts,
    cart => cart.items,
    { onDelete: 'CASCADE' }
  )
  @JoinColumn({ name: 'cart_id' })
  cart?: Carts;
}