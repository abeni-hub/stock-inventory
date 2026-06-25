import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Get All Products
  findAll() {
    return this.prisma.product.findMany();
  }

  // Get one product by id
  findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  // Create Product
  create(name: string, quantity: number) {
    return this.prisma.product.create({
      data: {
        name,
        quantity,
      },
    });
  }

  // Update Product
  update(id: number, name: string) {
    return this.prisma.product.update({
      where: { id },
      data: { name },
    });
  }

  // Delete Product
  remove(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}