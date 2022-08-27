import { Test } from '@nestjs/testing';
import { BackendPoliciesService } from './backend-policies.service';

describe('BackendPoliciesService', () => {
  let service: BackendPoliciesService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendPoliciesService],
    }).compile();

    service = module.get(BackendPoliciesService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
