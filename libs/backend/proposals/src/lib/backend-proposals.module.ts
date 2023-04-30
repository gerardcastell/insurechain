import { Module } from '@nestjs/common';
import { BackendProposalsService } from './backend-proposals.service';
import { ProposalsController } from './proposals.controller';
import { BackendPrismaModule } from '@insurechain/backend/prisma';

@Module({
  controllers: [ProposalsController],
  providers: [BackendProposalsService],
  exports: [BackendProposalsService],
  imports: [BackendPrismaModule],
})
export class BackendProposalsModule {}
