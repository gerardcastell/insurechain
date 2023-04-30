import { PrismaService } from '@insurechain/backend/prisma';
import { Injectable } from '@nestjs/common';
import {
  Coverage,
  CoverageType,
  RiskObject,
  RiskSubject,
} from '@prisma/client';

@Injectable()
export class BackendProposalsService {
  constructor(private prisma: PrismaService) {}

  quote(
    riskObject: Omit<RiskObject, 'id' | 'proposalId'>,
    riskSubject: Omit<RiskSubject, 'id' | 'proposalId'>,
    coverages: Coverage[]
  ): Promise<CoverageType[]> {
    return this.prisma.coverageType.findMany({
      where: { identifier: { in: coverages } },
      // include: {
      //   params: {
      //     include: {
      //       choices: true,
      //     },
      //   },
      // },
    });
  }
}
