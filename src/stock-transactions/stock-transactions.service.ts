import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import {
  PrismaService,
} from '../prisma/prisma.service';

import {
  TransactionType,
} from '@prisma/client';

import { CreateStockTransactionDto } from './dto/create-stock-transaction.dto';

@Injectable()
export class StockTransactionsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /*
  =====================================================
  Create Stock Transaction
  =====================================================
  */

  async create(
    dto: CreateStockTransactionDto,
    userId: string,
  ) {
    return this.prisma.$transaction(async (tx) => {
      /*
      --------------------------
      Find Product
      --------------------------
      */

      const product =
        await tx.product.findUnique({
          where: {
            id: dto.productId,
          },
        });

      if (!product) {
        throw new NotFoundException(
          'Product not found',
        );
      }

      /*
      --------------------------
      Find Warehouse
      --------------------------
      */

      const warehouse =
        await tx.warehouse.findUnique({
          where: {
            id: dto.warehouseId,
          },
        });

      if (!warehouse) {
        throw new NotFoundException(
          'Warehouse not found',
        );
      }

      /*
      --------------------------
      Product belongs to warehouse?
      --------------------------
      */

      if (
        product.warehouseId !== dto.warehouseId
      ) {
        throw new BadRequestException(
          'Product does not belong to this warehouse',
        );
      }

      /*
      --------------------------
      Find User
      --------------------------
      */

      const user =
        await tx.user.findUnique({
          where: {
            id: userId,
          },
        });

      if (!user) {
        throw new NotFoundException(
          'User not found',
        );
      }

      /*
      --------------------------
      Stock Validation
      --------------------------
      */

      if (
        dto.type === TransactionType.OUT &&
        product.quantity < dto.quantity
      ) {
        throw new BadRequestException(
          'Insufficient stock',
        );
      }

      /*
      --------------------------
      Calculate New Quantity
      --------------------------
      */

      let newQuantity = product.quantity;

      if (dto.type === TransactionType.IN) {
        newQuantity += dto.quantity;
      } else {
        newQuantity -= dto.quantity;
      }

      /*
      --------------------------
      Update Product Quantity
      --------------------------
      */

      const updatedProduct =
        await tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            quantity: newQuantity,
          },
        });

      /*
      --------------------------
      Create Transaction Record
      --------------------------
      */

      const transaction =
        await tx.stockTransaction.create({
          data: {
            quantity: dto.quantity,
            type: dto.type,
            reason: dto.reason,

            product: {
              connect: {
                id: dto.productId,
              },
            },

            warehouse: {
              connect: {
                id: dto.warehouseId,
              },
            },

            user: {
              connect: {
                id: userId,
              },
            },
          },

          include: {
            product: true,
            warehouse: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                role: true,
              },
            },
          },
        });

      return {
        message:
          dto.type === TransactionType.IN
            ? 'Stock added successfully'
            : 'Stock removed successfully',

        transaction,

        product: updatedProduct,
      };
    });
  }

  /*
  =====================================================
  Get All Transactions
  =====================================================
  */

  async findAll() {
    return this.prisma.stockTransaction.findMany({
      include: {
        product: true,
        warehouse: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  /*
  =====================================================
  Get One Transaction
  =====================================================
  */

  async findOne(id: string) {
    const transaction =
      await this.prisma.stockTransaction.findUnique({
        where: {
          id,
        },

        include: {
          product: true,
          warehouse: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
            },
          },
        },
      });

    if (!transaction) {
      throw new NotFoundException(
        'Transaction not found',
      );
    }

    return transaction;
  }
}