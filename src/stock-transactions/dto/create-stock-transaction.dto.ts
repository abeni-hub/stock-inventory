import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import { TransactionType } from '@prisma/client';

export class CreateStockTransactionDto {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  productId: string;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  warehouseId: string;

  @ApiProperty({
    enum: TransactionType,
    example: TransactionType.IN,
  })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({
    example: 10,
  })
  @IsPositive()
  quantity: number;

  @ApiProperty({
    required: false,
    example: 'Initial stock from supplier',
  })
  @IsOptional()
  @IsString()
  reason?: string;
}