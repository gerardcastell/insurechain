import { BackendPrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';
export type User = any;
@Injectable()
export class BackendUsersService {
  constructor(private prisma: BackendPrismaService) {}

  create(email: string, password: string) {
    return this.prisma.user.create({ data: { email, password } });
  }

  findUser(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
