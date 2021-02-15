import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/user/dto/user.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger = new Logger('RoleGuard');

  constructor(private reflector: Reflector) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    try {
      const matchUserRole = this.matchRole(roles, user.role);

      if (matchUserRole) {
        console.log(matchUserRole);
        return true;
      }
    } catch (err) {
      console.log(err.message);

      return false;
    }
  }

  // check the user role
  private matchRole(roles: string[], userRole: Role) {
    return roles.includes(userRole);
  }
}
