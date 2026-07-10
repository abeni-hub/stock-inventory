import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  // Current authenticated user
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  // Get all products (pagination + filtering + sorting)
  @Get()
  findAll(
    @Query() query: ProductQueryDto,
  ) {
    return this.productsService.findAll(query);
  }

  // Get product by ID
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.productsService.findOne(id);
  }

  // Create product
  @Post()
  create(
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(
      dto.name,
      dto.quantity,
      dto.warehouseId,
    );
  }

  // Update product
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    dto: UpdateProductDto,
  ) {
    return this.productsService.update(
      id,
      dto.name,
    );
  }

  // Delete product (ADMIN only)
  @Roles('ADMIN')
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.productsService.remove(id);
  }
}