import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Get all products with pagination + filtering + sorting
  async findAll(
    query: ProductQueryDto,
  ) {
    const {
      page,
      limit,
      name,
      warehouseId,
      sortBy,
      order,
    } = query;

    const where = {
      ...(name && {
        name: {
          contains: name,
          mode: 'insensitive' as const,
        },
      }),

      ...(warehouseId && {
        warehouseId,
      }),
    };

    const total =
      await this.prisma.product.count({
        where,
      });

    const products =
      await this.prisma.product.findMany({
        where,

        skip: (page - 1) * limit,

        take: limit,

        orderBy: {
          [sortBy]: order,
        },

        include: {
          warehouse: true,
        },
      });

    return {
      data: products,

      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(
          total / limit,
        ),
      },
    };
  }

  // Get one product
  async findOne(id: number) {
    const product =
      await this.prisma.product.findUnique({
        where: {
          id,
        },

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

    const warehouse =
      await this.prisma.warehouse.findUnique({
        where: {
          id: warehouseId,
        },
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
async update(
  id: number,
  dto: UpdateProductDto,
) {
  const product =
    await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

  if (!product) {
    throw new NotFoundException(
      `Product with ID ${id} not found`,
    );
  }

  // Check duplicate name only if a new name is provided
  if (dto.name) {
    const duplicate =
      await this.prisma.product.findFirst({
        where: {
          name: {
            equals: dto.name,
            mode: 'insensitive',
          },

          NOT: {
            id,
          },
        },
      });

    if (duplicate) {
      throw new ConflictException(
        `Product "${dto.name}" already exists`,
      );
    }
  }

  // Verify warehouse if changing warehouse
  if (dto.warehouseId) {
    const warehouse =
      await this.prisma.warehouse.findUnique({
        where: {
          id: dto.warehouseId,
        },
      });

    if (!warehouse) {
      throw new NotFoundException(
        `Warehouse with ID ${dto.warehouseId} not found`,
      );
    }
  }

  return this.prisma.product.update({
    where: {
      id,
    },

    data: {
      ...(dto.name && {
        name: dto.name,
      }),

      ...(dto.quantity !== undefined && {
        quantity: dto.quantity,
      }),

      ...(dto.warehouseId && {
        warehouse: {
          connect: {
            id: dto.warehouseId,
          },
        },
      }),
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
        where: {
          id,
        },
      });

    if (!product) {
      throw new NotFoundException(
        `Product with ID ${id} not found`,
      );
    }

    return this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}