import { Injectable } from '@nestjs/common';
import { ProductsService } from './products/products.service';

@Injectable()
export class AppService {

  constructor(private readonly productsService: ProductsService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAllWarehouseProducts() {
    
    const products  = await this.productsService.findAll();

    return products;
  }

}
