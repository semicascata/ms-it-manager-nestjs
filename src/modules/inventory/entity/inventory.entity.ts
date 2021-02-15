import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Sector } from '../dto/inventory.dto';
import { Client } from '../../client/entity/client.entity';

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

  @ManyToOne(
    () => Client,
    client => client.invCliId,
  )
  clientInvId: Client;

  // orderInvId: Order;
}
