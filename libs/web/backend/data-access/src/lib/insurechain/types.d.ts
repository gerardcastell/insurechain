import { Coverage, RiskObject, RiskSubject } from '@prisma/client';
export type QuoteBody = {
  riskObject: Omit<RiskObject, 'id' | 'proposalId'>;
  riskSubject: Omit<RiskSubject, 'id' | 'proposalId'>;
  coverages: Coverage[];
};

export type QuoteResponse = CoverageProduct[];

export type CoverageProduct = {
  id: number;
  identifier: Coverage;
  description: string;
  premium: number;
  title: string;
};
