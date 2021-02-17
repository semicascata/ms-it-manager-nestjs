import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Client } from './entity/client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  private logger = new Logger('ClientRepository');

  // fetch clients
  async fetchClients(): Promise<Client[]> {
    const query = this.createQueryBuilder('client');

    try {
      const clients = await query.getMany();
      this.logger.verbose('fetching clients');

      return clients;
    } catch (err) {
      this.logger.error(`failed to fetch clients - ${err.message}`);
      throw new InternalServerErrorException(
        `Failed to fetch clients - ${err.message}`,
      );
    }
  }

  // get orders per client
}
