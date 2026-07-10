import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsEnum,
} from 'class-validator';

import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}