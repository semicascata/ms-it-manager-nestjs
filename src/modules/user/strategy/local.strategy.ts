import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from '../../user/entity/user.entity';
import { CredentialsDto } from '../dto/credentials.dto';
import { UserService } from '../user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger('LocalStrategy');

  constructor(private userService: UserService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }

  // validation (must be called as "validate")
  async validate(username: string, password: string): Promise<User> {
    const credentialsDto: CredentialsDto = { username, password };

    try {
      const user = await this.userService.validateUser(credentialsDto);
      return user;
    } catch (err) {
      this.logger.error(`invalid credentials - ${err.message}`);
      throw new UnauthorizedException(`Invalid credentials - ${err.message}`);
    }
  }
}
