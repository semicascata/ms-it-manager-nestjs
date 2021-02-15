import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { Role } from './dto/user.dto';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { AuthRole } from 'src/common/decorators/role.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/common/guards/role.guard';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('api/v1/msim/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @AuthRole('admin')
  async fetchUsers(): Promise<User[]> {
    return this.userService.fetchUsers();
  }

  @Get('profile')
  async userProfile(@GetUser() user: User): Promise<User> {
    return this.userService.userProfile(user);
  }

  @AuthRole('admin')
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<any> {
    return this.userService.deleteUser(id);
  }

  @AuthRole(Role.admin)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }
}
