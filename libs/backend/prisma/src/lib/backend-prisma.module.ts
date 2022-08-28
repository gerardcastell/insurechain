import { Module } from '@nestjs/common';
import { BackendPrismaService } from './backend-prisma.service';

@Module({
  controllers: [],
  providers: [BackendPrismaService],
  exports: [BackendPrismaService],
})
export class BackendPrismaModule {}
