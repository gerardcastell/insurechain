import { PrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';
import { CoverageType } from '@prisma/client';

@Injectable()
export class BackendProposalsService {
  constructor(private prisma: PrismaService) {}

  quote(): Promise<CoverageType[]> {
    return this.prisma.coverageType.findMany();
  }
}
