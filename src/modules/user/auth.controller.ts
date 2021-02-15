import { Body, Controller, Post } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { IToken } from './interface/token.interface';

@Controller('api/v1/msim/auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post()
  async registerUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.registerUser(userDto);
  }

  @Post('login')
  async loginUser(@Body() credentialsDto: CredentialsDto): Promise<IToken> {
    return this.userService.validateUser(credentialsDto);
  }
}
