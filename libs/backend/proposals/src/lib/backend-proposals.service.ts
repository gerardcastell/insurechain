import { PrismaService } from '@insurechain/backend/prisma';
import { BackendUsersService } from '@insurechain/backend/users';
import { Injectable, NotFoundException } from '@nestjs/common';
import {
  Coverage,
  CoverageProduct,
  CoverageType,
  RiskObject,
  RiskSubject,
} from '@prisma/client';

@Injectable()
export class BackendProposalsService {
  constructor(
    private prisma: PrismaService,
    private userService: BackendUsersService
  ) {}

  getProposals(userId: number) {
    return this.prisma.proposal.findMany({
      where: {
        policyHolderId: userId,
      },
      include: {
        coverages: true,
        riskObject: true,
        riskSubject: true,
      },
    });
  }

  async getProposal(userId: number, proposalId: number) {
    try {
      const proposal = await this.prisma.proposal.findFirstOrThrow({
        where: { id: proposalId, policyHolderId: userId },
        include: {
          coverages: true,
          riskObject: true,
          riskSubject: true,
        },
      });
      return proposal;
    } catch (err) {
      throw new NotFoundException('Proposal not found');
    }
  }

  quote(
    riskObject: Omit<RiskObject, 'id' | 'proposalId'>,
    riskSubject: Omit<RiskSubject, 'id' | 'proposalId'>,
    coverages: Coverage[] = []
  ): Promise<
    (Omit<CoverageProduct, 'basePriceFactor'> & { monthlyPremium: number })[]
  > {
    const price = this.getPrice(riskObject);
    return this.getCoverageProducts(coverages).then((coverageTypes) =>
      coverageTypes.map((coverageType) => {
        const { basePriceFactor, ...rest } = coverageType;
        return {
          ...rest,
          monthlyPremium: Math.round(basePriceFactor * price * 100) / 100,
        };
      })
    );
  }

  async saveProposal(
    userId: number,
    riskObject: Omit<RiskObject, 'id' | 'proposalId'>,
    riskSubject: Omit<RiskSubject, 'id'>,
    coverages: Omit<CoverageType, 'id' | 'proposalId'>[]
  ) {
    const user = await this.userService.findOneById(userId);

    if (!user) throw new NotFoundException('User not found');
    return this.prisma.proposal.create({
      data: {
        policyHolder: {
          connect: {
            id: userId,
          },
        },
        riskObject: {
          create: riskObject,
        },
        riskSubject: {
          connectOrCreate: {
            where: {
              documentNumber: riskSubject.documentNumber,
            },
            create: riskSubject,
          },
        },
        coverages: {
          create: coverages,
        },
      },
      include: {
        coverages: true,
        riskObject: true,
        riskSubject: true,
      },
    });
  }

  uploadToBlockchain(proposalId: number, address: string) {
    return this.prisma.proposal.update({
      where: {
        id: proposalId,
      },
      data: {
        smartContractAddress: address,
      },
    });
  }

  private getCoverageProducts(
    coverages: Coverage[]
  ): Promise<CoverageProduct[]> {
    return this.prisma.coverageProduct.findMany({
      ...(coverages.length && { where: { identifier: { in: coverages } } }),
    });
  }

  private getPrice(riskObject: Omit<RiskObject, 'id' | 'proposalId'>): number {
    return riskObject.retailPrice / 1000 / 2;
  }
}
