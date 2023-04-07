import { Module } from '@nestjs/common';
import { PrismaService } from './backend-prisma.service';
import { PrismaHealthIndicator } from './prisma-health-indicator.service';

@Module({
  controllers: [],
  providers: [PrismaService, PrismaHealthIndicator],
  exports: [PrismaService, PrismaHealthIndicator],
})
export class BackendPrismaModule {}
