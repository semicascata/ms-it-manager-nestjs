import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { UserDto } from './dto/user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { AuthProvider } from '../../common/providers/auth.provider';
import { IToken } from './interface/token.interface';
import { IPayload } from './interface/payload.interface';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    private userRepository: UserRepository,
    private authProvider: AuthProvider,
  ) {}

  // fetch users
  async fetchUsers(): Promise<User[]> {
    return this.userRepository.fetchUsers();
  }

  // get user profile
  async userProfile(user: User): Promise<User> {
    return this.userRepository.userProfile(user);
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

  // local strategy validation
  async validateUser(credentialsDto: CredentialsDto): Promise<any> {
    const user = await this.userRepository.findOne({
      username: credentialsDto.username,
    });

    // validate password
    const isMatch = await this.authProvider.hashAndMatch(
      user.password,
      credentialsDto.password,
    );

    if (user && isMatch) {
      const token: IToken = await this.authProvider.generateTokens(user);

      return token;
    }

    this.logger.error(`authentication failed`);
    throw new UnauthorizedException('Authentication failed');
  }

  // jwt validation
  async jwtValidation(payload: IPayload): Promise<User> {
    return await this.userRepository.findOne(payload.id);
  }
}
