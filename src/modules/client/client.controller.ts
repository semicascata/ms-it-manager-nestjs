import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClientService } from './client.service';
import { Client } from './entity/client.entity';
import { ClientDto } from './dto/client.dto';

@Controller('api/v1/msim/client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async fetchClients(): Promise<Client[]> {
    return this.clientService.fetchClients();
  }

  @Post()
  async registerClient(@Body() clientDto: ClientDto): Promise<Client> {
    return this.clientService.registerClient(clientDto);
  }

  @Delete(':id')
  async deleteClient(@Param('id') id: number): Promise<Client> {
    return this.clientService.deleteClient(id);
  }
}
