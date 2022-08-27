import { Module } from '@nestjs/common';
import { BackendProposalsService } from './backend-proposals.service';

@Module({
  controllers: [],
  providers: [BackendProposalsService],
  exports: [BackendProposalsService],
})
export class BackendProposalsModule {}
