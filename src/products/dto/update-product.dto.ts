import {
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @MinLength(2)
  name: string;
}