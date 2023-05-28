import { Coverage, RiskObject, RiskSubject } from '@prisma/client';
export type quoteBody = {
  riskObject: RiskObject;
  riskSubject: RiskSubject;
  coverages: Coverage[];
};

export type quoteResponse = CoverageProduct[];

export type CoverageProduct = {
  id: number;
  identifier: Coverage;
  description: string;
  premium: number;
  title: string;
};
