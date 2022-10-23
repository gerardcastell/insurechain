import { Test } from '@nestjs/testing';
import { BackendUtilsService } from './backend-utils.service';

describe('BackendUtilsService', () => {
  let service: BackendUtilsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendUtilsService],
    }).compile();

    service = module.get(BackendUtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
