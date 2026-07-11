import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateWarehouseDto {
  @ApiPropertyOptional({
    example: 'Main Warehouse',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Hawassa',
  })
  @IsOptional()
  @IsString()
  location?: string;
}