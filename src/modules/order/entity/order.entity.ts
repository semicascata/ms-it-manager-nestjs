import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Priority, Status } from '../dto/order.dto';
import { Client } from '../../client/entity/client.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  obs: string;

  @Column({ type: 'timestamp' })
  time: Date;

  @Column('enum', { nullable: false, enum: Priority, default: Priority.medium })
  priority: Priority;

  @Column('enum', { nullable: false, enum: Status, default: Status.open })
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(
    () => Client,
    client => client.orderCliId,
  )
  orderCliId: Client;
}
