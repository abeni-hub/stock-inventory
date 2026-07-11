import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional({
    example: 'Gaming Laptop',
    description: 'Updated product name',
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    example: 50,
    description: 'Updated quantity',
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({
    example: 2,
    description: 'Move product to another warehouse',
  })
  @IsOptional()
  @IsInt()
  warehouseId?: number;
}