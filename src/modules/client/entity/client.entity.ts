import { Inventory } from '../../inventory/entity/inventory.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from 'src/modules/order/entity/order.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  contact1: string;

  @Column({ nullable: true })
  contact2: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(
    () => Inventory,
    inventory => inventory.clientInvId,
  )
  invCliId: Inventory[];

  @OneToMany(
    () => Order,
    order => order.orderCliId,
  )
  orderCliId: Order[];
}
