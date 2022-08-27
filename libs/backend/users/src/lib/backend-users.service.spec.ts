import { Test } from '@nestjs/testing';
import { BackendUsersService } from './backend-users.service';

describe('BackendUsersService', () => {
  let service: BackendUsersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendUsersService],
    }).compile();

    service = module.get(BackendUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
