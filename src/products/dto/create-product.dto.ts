import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop',
    description: 'Name of the product',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 20,
    description: 'Quantity available',
  })
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({
    example: 1,
    description: 'Warehouse ID where the product is stored',
  })
  @IsInt()
  warehouseId: number;
}