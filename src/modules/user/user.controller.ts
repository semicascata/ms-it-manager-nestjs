import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { Role, UserDto } from './dto/user.dto';
import { CredentialsDto } from './dto/credentials.dto';
import { IToken } from './interface/token.interface';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/common/decorators/role.decorator';

@Controller('api/v1/msim/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async registerUser(@Body() userDto: UserDto): Promise<User> {
    return this.userService.registerUser(userDto);
  }

  @Post('login')
  async loginUser(@Body() credentialsDto: CredentialsDto): Promise<IToken> {
    return this.userService.validateUser(credentialsDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async fetchUsers(): Promise<User[]> {
    return this.userService.fetchUsers();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async userProfile(@GetUser() user: User): Promise<User> {
    return this.userService.userProfile(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @AuthRole(Role.admin)
  @Delete(':id')
  async deleteUser(
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<any> {
    return this.userService.deleteUser(user, id);
  }
}
