import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Register User
  async register(dto: CreateUserDto) {
    const existingUser =
      await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException(
        'Email already exists',
      );
    }

    const hashedPassword =
      await bcrypt.hash(dto.password, 10);

    const user =
      await this.usersService.create({
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      });

    const { password, ...result } = user;

    return result;
  }

  // Login User
  async login(dto: LoginDto) {
    const user =
      await this.usersService.findByEmail(
        dto.email,
      );

    console.log('User found:', user);

    if (!user) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        dto.password,
        user.password,
      );

    console.log(
      'Password matches:',
      passwordMatches,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role : user.role,
    };

    const access_token =
      this.jwtService.sign(payload);

    console.log('Generated Token:', access_token);

    return {
      access_token,
    };
  }
}