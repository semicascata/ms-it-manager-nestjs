import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { InventoryRepository } from './inventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryRepository])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
