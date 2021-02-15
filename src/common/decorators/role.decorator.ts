import { SetMetadata } from '@nestjs/common';

export const AuthRole = (...roles: string[]) => SetMetadata('roles', roles);
