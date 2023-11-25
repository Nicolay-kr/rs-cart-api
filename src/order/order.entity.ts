import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Carts } from '../cart/cart.entity';

export enum Status {
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

@Entity()
export class Orders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @OneToOne(() => Carts, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cart_id' })
  cart: Carts;

  @Column('json', { default: () => '\'{"method": "credit-card"}\'' })
  payment: any;

  @Column('json', { default: () => '\'{"method": "credit-card"}\'' })
  delivery: any;

  @Column('text', { nullable: true })
  comments: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.IN_PROGRESS,
  })
  status: Status;

  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  total: number;

  @Column('uuid')
  cart_id: string;
}
