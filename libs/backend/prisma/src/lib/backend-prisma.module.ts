import { Module } from '@nestjs/common';
import { PrismaService } from './backend-prisma.service';

@Module({
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class BackendPrismaModule {}
