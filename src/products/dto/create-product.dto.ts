import {
  IsInt,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Laptop',
  })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({
    example: 25,
  })
  @IsInt()
  @Min(0)
  quantity: number;

  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  warehouseId: string;
}