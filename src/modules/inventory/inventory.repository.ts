import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Inventory } from './entity/inventory.entity';

@EntityRepository(Inventory)
export class InventoryRepository extends Repository<Inventory> {
  private logger = new Logger('InventoryRepository');
}
