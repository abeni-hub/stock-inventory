// src/products/dto/create-product.dto.ts

import {
  IsString,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsInt()
  @Min(0)
  quantity: number;
}