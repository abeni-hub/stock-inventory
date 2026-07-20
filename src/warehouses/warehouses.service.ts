import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WarehousesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Get all warehouses
  findAll() {
    return this.prisma.warehouse.findMany({
      include: {
        products: true,
      },
    });
  }

  // Get one warehouse
  async findOne(id: string) {
    const warehouse =
      await this.prisma.warehouse.findUnique({
        where: { id },
        include: {
          products: true,
        },
      });

    if (!warehouse) {
      throw new NotFoundException(
        `Warehouse with ID ${id} not found`,
      );
    }

    return warehouse;
  }

  // Create warehouse
  async create(
    name: string,
    location: string,
  ) {
    const existing =
      await this.prisma.warehouse.findFirst({
        where: {
          name: {
            equals: name,
            mode: 'insensitive',
          },
        },
      });

    if (existing) {
      throw new ConflictException(
        `Warehouse "${name}" already exists`,
      );
    }

    return this.prisma.warehouse.create({
      data: {
        name,
        location,
      },
    });
  }

  // Update warehouse
  async update(
    id: string,
    name: string,
    location: string,
  ) {
    const warehouse =
      await this.prisma.warehouse.findUnique({
        where: { id },
      });

    if (!warehouse) {
      throw new NotFoundException(
        `Warehouse with ID ${id} not found`,
      );
    }

    return this.prisma.warehouse.update({
      where: { id },
      data: {
        name,
        location,
      },
    });
  }

  // Delete warehouse
  async remove(id: string) {
    const warehouse =
      await this.prisma.warehouse.findUnique({
        where: { id },
      });

    if (!warehouse) {
      throw new NotFoundException(
        `Warehouse with ID ${id} not found`,
      );
    }

    return this.prisma.warehouse.delete({
      where: { id },
    });
  }
}