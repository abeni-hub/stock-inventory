import {
  ApiPropertyOptional,
} from '@nestjs/swagger';

import { Type } from 'class-transformer';

import {
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ProductQueryDto {
  @ApiPropertyOptional({
    example: 1,
    default: 1,
    description: 'Current page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @ApiPropertyOptional({
    example: 10,
    default: 10,
    description: 'Items per page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit = 10;

  @ApiPropertyOptional({
    example: 'Laptop',
    description: 'Search product by name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Filter by warehouse ID',
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  warehouseId?: number;

  @ApiPropertyOptional({
    enum: ['name', 'quantity', 'createdAt'],
    default: 'createdAt',
    description: 'Sort field',
  })
  @IsOptional()
  @IsIn([
    'name',
    'quantity',
    'createdAt',
  ])
  sortBy:
    | 'name'
    | 'quantity'
    | 'createdAt' = 'createdAt';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    default: 'desc',
    description: 'Sort direction',
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