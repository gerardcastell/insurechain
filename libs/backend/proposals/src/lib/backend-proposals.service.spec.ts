import { Test } from '@nestjs/testing';
import { BackendProposalsService } from './backend-proposals.service';

describe('BackendProposalsService', () => {
  let service: BackendProposalsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendProposalsService],
    }).compile();

    service = module.get(BackendProposalsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
