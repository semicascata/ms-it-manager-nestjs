import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from 'src/modules/user/dto/user.dto';
import * as jwt from 'jsonwebtoken';
import { jwtSecret } from '../../config/env.config';
import { UserService } from '../../modules/user/user.service';
import { IPayload } from 'src/modules/user/interface/payload.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  private logger = new Logger('RoleGuard');

  constructor(private reflector: Reflector, private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('role', context.getHandler());

    if (!roles || roles.length === 0) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization.split(' ')[1];

    const decoded = jwt.verify(token, jwtSecret);
    const user = await this.userService.jwtValidation(Object(decoded));

    const matchUserRole = this.matchRole(roles, user.role);

    if (matchUserRole) {
      this.logger.verbose('user role authorized');
      return matchUserRole;
    } else {
      this.logger.error('user role not authorized');
      throw new UnauthorizedException('User role not authorized');
    }
  }

  // check the user role
  private matchRole(roles: string[], userRole: Role) {
    return roles.includes(userRole);
  }
}
