import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Injectable()
export class WarehousesService {
  constructor(
    private readonly productsService: ProductsService,
  ) {}

  getProductsFromWarehouse() {
    return this.productsService.findAll();
  }
}