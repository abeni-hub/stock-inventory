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
import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

@UseGuards(JwtAuthGuard , RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  // Get the currently authenticated user
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  // Get all products or search by name
  @Get()
  findAll(
    @Query('name') name?: string,
  ) {
    if (name) {
      return this.productsService.findByName(name);
    }

    return this.productsService.findAll();
  }

  // Create a product
  @Post()
  create(
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(
      dto.name,
      dto.quantity,
    );
  }

  // Update a product
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(
      id,
      dto.name,
    );
  }

  // Delete a product
  @Roles('ADMIN')
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.remove(id);
  }

  // Get a product by ID
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productsService.findOne(id);
  }
}