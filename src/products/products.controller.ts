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
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

 @Get()
findAll(
  @Query('name') name?: string,
) {
  if (name) {
    return this.productsService.findByName(name);
  }

  return this.productsService.findAll();
}

  @Post()
  create(
    @Body() dto: CreateProductDto,
  ) {
    return this.productsService.create(
      dto.name,
      dto.quantity,
    );
  }

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

  @Delete(':id')
  remove(@Param('id', ParseIntPipe)
  id: number,) {
    return this.productsService.remove(
      Number(id),
    );
  }
@Get(':id')
findOne(
  @Param('id', ParseIntPipe)
  id: number,
) {
  return this.productsService.findOne(id);
}
}
