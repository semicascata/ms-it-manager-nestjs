import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum Sector {
  infra = 'infra',
  network = 'network',
  peripheral = 'peripheral',
  license = 'license',
}

export class InventoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEnum(Sector)
  sector: Sector;

  // clientInvId: Client;
  // orderInvId: Order;
}
