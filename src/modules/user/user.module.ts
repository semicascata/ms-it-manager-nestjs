import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { AuthProvider } from '../../common/providers/auth.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtSecret, jwtExpires } from '../../config/env.config';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: jwtExpires },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [UserService, AuthProvider, LocalStrategy, JwtStrategy],
  exports: [UserService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
