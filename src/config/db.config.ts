import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { tpUrl } from './env.config';
import { User } from '../modules/user/entity/user.entity';
import { Client } from '../modules/client/entity/client.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { tpDatabase, tpPassword, tpUsername, tpType } from './env.config';
import { Inventory } from '../modules/inventory/entity/inventory.entity';
import { Order } from '../modules/order/entity/order.entity';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  private logger = new Logger('Database');

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options: any = {
      type: tpType,
      url: tpUrl,
      username: tpUsername,
      password: tpPassword,
      database: tpDatabase,
      entities: [User, Client, Inventory, Order],
      synchronize: true,
    } as TypeOrmModuleOptions;

    createConnection(options)
      .then(() => {
        this.logger.log('>_ database connected');
      })
      .catch(err => {
        this.logger.error(`database error: ${err.message}`);
        throw new InternalServerErrorException(err);
      });

    return options;
  }
}
