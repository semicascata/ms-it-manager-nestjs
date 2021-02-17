import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { Client } from './entity/client.entity';
import { ClientDto } from './dto/client.dto';

@Injectable()
export class ClientService {
  private logger = new Logger('ClientService');

  constructor(private clientRepository: ClientRepository) {}

  // fetch clients
  async fetchClients(): Promise<Client[]> {
    return this.clientRepository.fetchClients();
  }

  // new client
  async registerClient(clientDto: ClientDto): Promise<Client> {
    const { name, email, city, state, contact1, contact2 } = clientDto;
    const newClient = new Client();

    newClient.name = name;
    newClient.email = email;
    newClient.city = city;
    newClient.state = state;
    contact1 ? (newClient.contact1 = contact1) : null;
    contact2 ? (newClient.contact1 = contact2) : null;

    try {
      await this.clientRepository.save(newClient);
      this.logger.verbose(`new client "${name}" registered`);
      return newClient;
    } catch (err) {
      this.logger.error(`failed to register new client - ${err.message}`);
      throw new InternalServerErrorException(
        `Failed to register new client - ${err.message}`,
      );
    }
  }

  // update client

  // delete client
  async deleteClient(id: number): Promise<any> {
    const client = await this.clientRepository.findOne(id);

    try {
      await this.clientRepository.remove(client);
      this.logger.verbose(`client "${client.name}" deleted`);
      return client;
    } catch (err) {
      this.logger.error(`failed to delete client - ${err.message}`);
      throw new InternalServerErrorException(
        `Failed to delete client - ${err.message}`,
      );
    }
  }
}
