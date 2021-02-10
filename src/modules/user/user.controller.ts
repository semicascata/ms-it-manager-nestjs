import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { IToken } from './interface/token.interface';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/msim/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async fetchUsers(): Promise<User[]> {
    return this.userService.fetchUsers();
  }

  @Post()
  async registerUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.registerUser(userDto);
  }

  @Post('login')
  async loginUser(@Body() credentialsDto: CredentialsDto): Promise<IToken> {
    return this.userService.validateUser(credentialsDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async userProfile(@GetUser() user: User): Promise<User> {
    return this.userService.userProfile(user);
  }
}
