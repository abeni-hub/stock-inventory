import { Module } from '@nestjs/common';
import { StockTransactionsController } from './stock-transactions.controller';
import { StockTransactionsService } from './stock-transactions.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockTransactionsController],
  providers: [StockTransactionsService]
})
export class StockTransactionsModule {}
