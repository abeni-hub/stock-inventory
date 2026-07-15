import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // Create User
  create(
    data: Prisma.UserCreateInput,
  ): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  // Find User by Email
  async findByEmail(
    email: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    console.log(
      'UsersService.findByEmail():',
      user,
    );

    return user;
  }

  // Find User by ID
  async findById(
    id: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    console.log(
      'UsersService.findById():',
      user,
    );

    return user;
  }
}