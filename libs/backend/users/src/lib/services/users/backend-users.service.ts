import { PrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class BackendUsersService {
  constructor(private prisma: PrismaService) {}

  create(address: string): Promise<Pick<User, 'address' | 'id'>> {
    return this.prisma.user.create({
      data: { address },
      select: { address: true, id: true },
    });
  }

  findByAddress(address: string): Promise<Pick<User, 'address'>[]> {
    return this.prisma.user.findMany({
      where: { address },
      select: { address: true },
    }) as unknown as Promise<User[]>;
  }

  findOneById(id: number): Promise<Pick<User, 'address'>> {
    return this.prisma.user.findUnique({
      where: { id },
      select: { address: true },
    });
  }

  findOneByAddress(address: string): Promise<Pick<User, 'address' | 'id'>> {
    return this.prisma.user.findUnique({
      where: { address },
      select: { address: true, id: true },
    }) as unknown as Promise<User>;
  }
}
