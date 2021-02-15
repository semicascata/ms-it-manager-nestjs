import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Order } from './entity/order.entity';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
  private logger = new Logger('OrderRepository');
}
