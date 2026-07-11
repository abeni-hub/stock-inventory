import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({
    example: 'Main Warehouse',
    description: 'Warehouse name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'Addis Ababa',
    description: 'Warehouse location',
  })
  @IsString()
  @IsNotEmpty()
  location: string;
}