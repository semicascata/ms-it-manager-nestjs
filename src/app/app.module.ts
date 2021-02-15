import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmService } from '../config/db.config';
import { UserModule } from '../modules/user/user.module';
import { ClientModule } from '../modules/client/client.module';
import { InventoryModule } from '../modules/inventory/inventory.module';
import { OrderModule } from '../modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmService,
    }),
    UserModule,
    ClientModule,
    InventoryModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
