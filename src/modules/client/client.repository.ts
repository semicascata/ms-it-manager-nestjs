import { Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Client } from './entity/client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  private logger = new Logger('ClientRepository');
}
