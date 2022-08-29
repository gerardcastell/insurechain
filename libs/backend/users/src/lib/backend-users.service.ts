import { BackendPrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
@Injectable()
export class BackendUsersService {
  constructor(private prisma: BackendPrismaService) {}

  create(email: string, password: string) {
    return this.prisma.user.create({ data: { email, password } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
