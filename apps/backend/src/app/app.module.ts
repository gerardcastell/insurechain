import { BackendPoliciesModule } from '@insurechain/backend/policies';
import { BackendProposalsModule } from '@insurechain/backend/proposals';
import { BackendUsersModule } from '@insurechain/backend/users';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [BackendUsersModule, BackendPoliciesModule, BackendProposalsModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
  ],
})
export class AppModule {}
