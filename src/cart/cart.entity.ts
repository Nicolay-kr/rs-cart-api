import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItems } from './cartItem.entity';

export enum Status {
  OPEN = 'OPEN',
  ORDERED = 'ORDERED',
}

@Entity()
export class Carts  {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  user_id: string;

  @Column({ type: 'date', nullable: true  })
  created_at: string;

  @Column({ type: 'date', nullable: true })
  updated_at: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.OPEN,
  })
  status: Status;

  @OneToMany(
    () => CartItems,
    cartItem => cartItem.cart,
    { cascade: true },
  )
  items: CartItems[];

}