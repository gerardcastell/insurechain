import { Module } from '@nestjs/common';
import { BackendProposalsService } from './backend-proposals.service';
import { ProposalsController } from './proposals.controller';

@Module({
  controllers: [ProposalsController],
  providers: [BackendProposalsService],
  exports: [BackendProposalsService],
})
export class BackendProposalsModule {}
