import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(private userRepository: UserRepository) {}

  // fetch users
  async fetchUsers(): Promise<User[]> {
    return this.userRepository.fetchUsers();
  }

  // register user
  async registerUser(userDto: UserDto): Promise<User> {
    const {
      username,
      firstName,
      lastName,
      password1,
      password2,
      role,
      occupation,
    } = userDto;
    const newUser = new User();

    if (password1 !== password2) {
      this.logger.error(`passwords dont match`);
      throw new ConflictException(`Passwords dont match`);
    }

    newUser.username = username;
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.password = password1;
    role ? (newUser.role = role) : null;
    occupation ? (newUser.occupation = occupation) : null;

    try {
      await this.userRepository.save(newUser);
      this.logger.verbose(`user registered!`);

      delete newUser.password;
      return newUser;
    } catch (err) {
      this.logger.error(`failed to register user - ${err.message}`);
      throw new InternalServerErrorException(
        `failed to register user - ${err.message}`,
      );
    }
  }
}
