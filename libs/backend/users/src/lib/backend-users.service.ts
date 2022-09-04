import { BackendPrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dtos/CreateUser.dto';
@Injectable()
export class BackendUsersService {
  constructor(private prisma: BackendPrismaService) {}

  create(payload: CreateUserDto) {
    return this.prisma.user.create({ data: { ...payload } });
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
