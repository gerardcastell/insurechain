import {
  Coverage,
  CoverageType,
  RiskObject,
  RiskSubject,
} from '@prisma/client';
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

export type SaveProposalBody = {
  riskObject: Omit<RiskObject, 'id' | 'proposalId'>;
  riskSubject: Omit<RiskSubject, 'id' | 'proposalId'>;
  coverages: Omit<CoverageType, 'id' | 'proposalId'>[];
};

export type ProposalDto = {
  coverages: CoverageType[];
  id: number;
  policyHolderId: number;
  riskObject: RiskObject;
  riskSubject: RiskSubject;
  smartContractAddress: string;
};
