import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from 'src/modules/user/dto/user.dto';
import { RoleGuard } from '../guards/role.guard';

export function AuthRole(...roles: Role[]) {
  return applyDecorators(SetMetadata('role', roles), UseGuards(RoleGuard));
}
