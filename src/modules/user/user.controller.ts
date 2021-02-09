import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

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
}
