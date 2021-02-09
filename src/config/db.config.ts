import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { tpUrl } from './env.config';
import { User } from '../modules/user/entity/user.entity';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import {
  tpDatabase,
  tpPassword,
  tpUsername,
  tpType,
  // tpHost,
  // tpPort,
} from './env.config';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  private logger = new Logger('Database');

  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options: any = {
      type: tpType,
      // host: tpHost,
      // port: tpPort,
      url: tpUrl,
      username: tpUsername,
      password: tpPassword,
      database: tpDatabase,
      entities: [User],
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
