import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  // fetch users
  async fetchUsers(): Promise<User[]> {
    const query = this.createQueryBuilder('user');

    try {
      const users = await query
        .select([
          'user.username',
          'user.role',
          'user.occupation',
          'user.createdAt',
        ])
        .getRawMany();

      return users;
    } catch (err) {
      this.logger.error(`failed to fetch users - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to fetch users - ${err.message}`,
      );
    }
  }
}
