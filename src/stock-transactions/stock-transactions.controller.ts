import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

import { StockTransactionsService } from './stock-transactions.service';
import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('stock-transactions')
export class StockTransactionsController {
  constructor(
    private readonly stockTransactionsService: StockTransactionsService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateStockTransactionDto,
    @Req() req: Request,
  ) {
    return this.stockTransactionsService.create(
      dto,
      (req.user as any).sub,
    );
  }

  @Get()
  findAll() {
    return this.stockTransactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stockTransactionsService.findOne(id);
  }
}