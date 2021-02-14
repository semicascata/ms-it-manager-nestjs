import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';
import { argonSalt, jwtExpires } from '../../config/env.config';
import { User } from '../../modules/user/entity/user.entity';
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { IPayload } from 'src/modules/user/interface/payload.interface';
import { IToken } from 'src/modules/user/interface/token.interface';
import { jwtSecret } from '../../config/env.config';

@Injectable()
export class AuthProvider {
  constructor(private jwtService: JwtService) {}

  // hash password argon2
  async hashPassword(password: string): Promise<any> {
    const salt = randomBytes(argonSalt);
    const hashed = await argon2.hash(password, { salt });
    return hashed;
  }

  // match passwords (registration)
  async matchPassword(pass1: string, pass2: string): Promise<boolean> {
    if (pass1 === pass2) {
      return true;
    } else {
      return false;
    }
  }

  // verify and compare passwords (validation)
  async hashAndMatch(pass1: string, pass2: string): Promise<boolean> {
    const isMatch = await argon2.verify(pass1, pass2);

    if (isMatch) {
      return true;
    } else {
      return false;
    }
  }

  // generate jwt token
  async generateTokens(user: User): Promise<IToken> {
    const payload: IPayload = { id: user.id };

    const token = this.jwtService.sign(payload, {
      expiresIn: jwtExpires,
    });

    return { token };
  }

  // decode jwt token
  async decodeJwtToken(token: string): Promise<IPayload> {
    const decoded = jwt.verify(token, jwtSecret);
    return Object(decoded);
  }
}
