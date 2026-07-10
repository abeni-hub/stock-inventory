import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Get all products
  findAll() {
    return this.prisma.product.findMany({
      include: {
        warehouse: true,
      },
    });
  }

  // Get one product
  async findOne(id: number) {
    const product =
      await this.prisma.product.findUnique({
        where: { id },
        include: {
          warehouse: true,
        },
      });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${id} not found`,
      );
    }

    return product;
  }

  // Search by name
  findByName(name: string) {
    return this.prisma.product.findMany({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
      include: {
        warehouse: true,
      },
    });
  }

  // Create product
  async create(
    name: string,
    quantity: number,
    warehouseId: number,
  ) {
    const existingProduct =
      await this.prisma.product.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
        },
      });

    if (existingProduct) {
      throw new ConflictException(
        `Product "${name}" already exists`,
      );
    }

    // Check if warehouse exists
    const warehouse =
      await this.prisma.warehouse.findUnique({
        where: { id: warehouseId },
      });

    if (!warehouse) {
      throw new NotFoundException(
        `Warehouse with ID ${warehouseId} not found`,
      );
    }

    return this.prisma.product.create({
      data: {
        name,
        quantity,
        warehouse: {
          connect: {
            id: warehouseId,
          },
        },
      },
      include: {
        warehouse: true,
      },
    });
  }

  // Update product
  async update(id: number, name: string) {
    const product =
      await this.prisma.product.findUnique({
        where: { id },
      });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${id} not found`,
      );
    }

    const duplicate =
      await this.prisma.product.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
          NOT: {
            id,
          },
        },
      });

    if (duplicate) {
      throw new ConflictException(
        `Product "${name}" already exists`,
      );
    }

    return this.prisma.product.update({
      where: { id },
      data: {
        name,
      },
      include: {
        warehouse: true,
      },
    });
  }

  // Delete product
  async remove(id: number) {
    const product =
      await this.prisma.product.findUnique({
        where: { id },
      });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${id} not found`,
      );
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }
}