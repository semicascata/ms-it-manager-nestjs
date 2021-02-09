import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'MarbleSea IT Manager - Raul Duarte',
    };
  }
}
