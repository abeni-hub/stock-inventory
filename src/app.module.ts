import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { WarehousesModule } from './warehouses/warehouses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { RolesGuard } from './common/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    ProductsModule,
    PrismaModule,
    WarehousesModule,
    AuthModule,
    UsersModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}