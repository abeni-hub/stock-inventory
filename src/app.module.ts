import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ProductsModule, WarehousesModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
