import { BackendPrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BackendUsersService {
  constructor(private prisma: BackendPrismaService) {}

  create(email: string, password: string) {
    return this.prisma.user.create({ data: { email, password } });
  }

  findUser(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
