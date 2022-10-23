import { PrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class BackendUsersService {
  constructor(private prisma: PrismaService) {}

  create(
    email: string,
    password: string
  ): Promise<Pick<User, 'email' | 'password'>> {
    return this.prisma.user.create({
      data: { email, password },
      select: { email: true, password: true },
    });
  }

  findOneByEmail(email: string): Promise<Pick<User, 'email' | 'password'>> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { email: true, password: true },
    });
  }

  findByEmail(email: string): Promise<Pick<User, 'email' | 'password'>[]> {
    return this.prisma.user.findMany({
      where: { email },
      select: { email: true, password: true },
    }) as unknown as Promise<User[]>;
  }

  findOneById(id: number): Promise<Pick<User, 'email' | 'password'>> {
    return this.prisma.user.findUnique({
      where: { id },
      select: { email: true, password: true },
    });
  }
}
