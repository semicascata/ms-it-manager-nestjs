import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/modules/user/dto/user.dto';
import { UserService } from '../../modules/user/user.service';
import { AuthProvider } from '../providers/auth.provider';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger = new Logger('RoleGuard');

  constructor(
    private reflector: Reflector,
    private userService: UserService,
    private authProvider: AuthProvider,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];

    try {
      // decode token
      const decoded = await this.authProvider.decodeJwtToken(token);

      // get user
      const user = await this.userService.jwtValidation(Object(decoded));

      const matchUserRole = this.matchRole(roles, user.role);

      if (matchUserRole) {
        return matchUserRole;
      } else {
        throw new Error('User role not authorized');
      }
    } catch (err) {
      this.logger.error(`${err.message}`);
      throw new UnauthorizedException(err.message);
    }
  }

  // check the user role
  private matchRole(roles: string[], userRole: Role) {
    return roles.includes(userRole);
  }
}
