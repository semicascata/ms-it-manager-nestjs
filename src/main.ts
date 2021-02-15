import { InternalServerErrorException, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as xss from 'xss-clean';
import * as hpp from 'hpp';
import * as rateLimit from 'express-rate-limit';
import { port } from './config/env.config';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    );

    const logger = new Logger('Bootstrap');

    app.enableCors();
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(xss());
    app.use(hpp());

    app.use(
      rateLimit({
        windowMs: 10 * 60 * 1000,
        max: 100,
        message: 'too many requests!',
      }),
    );

    await app.listen(port);

    logger.log(`>_ server running on: ${await app.getUrl()}/api/v1/msim`);
  } catch (err) {
    this.logger.error(`error starting server: ${err.message}`);
    throw new InternalServerErrorException(
      `error starting server: ${err.message}`,
    );
  }
}
bootstrap();
