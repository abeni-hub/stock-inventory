import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class TransactionQueryDto {
  @ApiPropertyOptional({
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({
    enum: ['IN', 'OUT'],
  })
  @IsOptional()
  @IsIn(['IN', 'OUT'])
  type?: 'IN' | 'OUT';

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  productId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  warehouseId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  userId?: string;

  @ApiPropertyOptional({
    enum: [
      'createdAt',
      'quantity',
    ],
    default: 'createdAt',
  })
  @IsOptional()
  @IsIn([
    'createdAt',
    'quantity',
  ])
  sortBy:
    | 'createdAt'
    | 'quantity' = 'createdAt';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'desc',
  })
  @IsOptional()
  @IsIn([
    'asc',
    'desc',
  ])
  order:
    | 'asc'
    | 'desc' = 'desc';
}