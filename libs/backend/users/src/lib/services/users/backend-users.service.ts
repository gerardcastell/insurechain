import { PrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
@Injectable()
export class BackendUsersService {
  constructor(private prisma: PrismaService) {}

  create(email: string, password: string, name: string): Promise<User> {
    return this.prisma.user.create({ data: { email, password, name } });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByEmail(email: string): Promise<User[]> {
    return this.prisma.user.findMany({ where: { email } });
  }

  findOneById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
