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

  async quote(
    riskObject: Omit<RiskObject, 'id' | 'proposalId'>,
    riskSubject: Omit<RiskSubject, 'id' | 'proposalId'>,
    coverages: Coverage[]
  ): Promise<(Omit<CoverageType, 'premiumFactor'> & { premium: number })[]> {
    const coverageTypes = await this.getCoverages(coverages);

    const price = this.getPrice(riskObject, riskSubject);

    return coverageTypes.map((coverageType) => {
      const { premiumFactor, ...rest } = coverageType;
      return {
        ...rest,
        premium: Math.round(premiumFactor * price * 100) / 100,
      };
    });
  }

  getCoverages(coverages: Coverage[]): Promise<CoverageType[]> {
    return this.prisma.coverageType.findMany({
      ...(coverages.length && { where: { identifier: { in: coverages } } }),
    });
  }

  getPrice(
    riskObject: Omit<RiskObject, 'id' | 'proposalId'>,
    riskSubject: Omit<RiskSubject, 'id' | 'proposalId'>
  ): number {
    return Math.random() * 100;
  }
}
