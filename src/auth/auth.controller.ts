import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';

import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User registered',
  })
  @Post('register')
  register(
    @Body()
    dto: CreateUserDto,
  ) {
    return this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'Login',
  })
  @ApiBody({
    type: LoginDto,
  })
  @ApiResponse({
    status: 200,
    description: 'JWT returned',
  })
  @Post('login')
  login(
    @Body()
    dto: LoginDto,
  ) {
    return this.authService.login(dto);
  }
}