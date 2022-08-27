import { BackendPoliciesModule } from '@insurechain/backend/policies';
import { BackendProposalsModule } from '@insurechain/backend/proposals';
import { BackendUsersModule } from '@insurechain/backend/users';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BackendUsersModule, BackendPoliciesModule, BackendProposalsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
