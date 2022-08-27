import { Module } from '@nestjs/common';
import { BackendPoliciesService } from './backend-policies.service';

@Module({
  controllers: [],
  providers: [BackendPoliciesService],
  exports: [BackendPoliciesService],
})
export class BackendPoliciesModule {}
