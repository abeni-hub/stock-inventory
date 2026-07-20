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

import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';

import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ParseUUIDPipe } from '@nestjs/common';
@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @ApiOperation({
    summary: 'Get currently authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Current user returned successfully',
  })
  @Get('me')
  getMe(@Req() req: Request) {
    return req.user;
  }

  @ApiOperation({
    summary: 'Get all products',
  })
  @ApiResponse({
    status: 200,
    description: 'Products returned successfully',
  })
  @Get()
  findAll(
    @Query() query: ProductQueryDto,
  ) {
    return this.productsService.findAll(query);
  }

  @ApiOperation({
    summary: 'Get product by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Product returned successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string ,
  ) {
    return this.productsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a new product',
  })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: 409,
    description: 'Product already exists',
  })
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

  @ApiOperation({
    summary: 'Update a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product updated successfully',
  })
 @Patch(':id')
update(
  @Param('id', ParseUUIDPipe)
  id: string,

  @Body()
  dto: UpdateProductDto,
) {
  return this.productsService.update(
    id,
    dto,
  );
}
  @ApiOperation({
    summary: 'Delete a product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product deleted successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Admin role required',
  })
  @Roles('ADMIN')
  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe )
    id: string ,
  ) {
    return this.productsService.remove(id);
  }
}