import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.productsService.create(body.name, body.quantity);
  }

@Patch(':id')
update(@Param('id') id: string, @Body() body: any) {
  return this.productsService.update(
    Number(id),
    body.name,
  );
}
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(
      Number(id),
    );

  

  
  }
}
