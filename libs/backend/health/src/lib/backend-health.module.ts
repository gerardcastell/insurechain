import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { BackendPrismaModule } from '@insurechain/backend/prisma';
@Module({
  imports: [TerminusModule, HttpModule, BackendPrismaModule],
  controllers: [HealthController],
})
export class BackendHealthModule {}
