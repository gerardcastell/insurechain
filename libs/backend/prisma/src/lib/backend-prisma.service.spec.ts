import { Test } from '@nestjs/testing';
import { BackendPrismaService } from './backend-prisma.service';

describe('BackendPrismaService', () => {
  let service: BackendPrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendPrismaService],
    }).compile();

    service = module.get(BackendPrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
