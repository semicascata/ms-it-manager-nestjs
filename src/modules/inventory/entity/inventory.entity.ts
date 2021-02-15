import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Sector } from '../dto/inventory.dto';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column('enum', {
    nullable: true,
    enum: Sector,
  })
  sector: Sector;

  // clientInvId: Client;
  // orderInvId: Order;
}
