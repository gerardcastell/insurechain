import { Coverage } from '@prisma/client';

export type ProposalState = {
  riskObject: RiskObject;
  riskSubject: RiskSubject;
  coverages: CoverageType[];
  setRiskSubject: (riskSubject: RiskSubject) => void;
  setMakerAndModel: (
    riskObject: Omit<RiskObject, 'version' | 'releaseDate' | 'retailPrice'>
  ) => void;
  setCarVersion: (
    partialRiskObject: Pick<
      RiskObject,
      'version' | 'releaseDate' | 'retailPrice'
    >
  ) => void;
  defineCoverages: (coverages: CoverageType[]) => void;
  selectCoverages: (ids: number[]) => void;
};

export type RiskObject = {
  maker: string;
  model: string;
  version: string;
  numberDoors: number;
  fuelType: FuelType;
  power: number;
  purchaseDate: Date;
  plate: string;
  kmsYear: number;
  parking: string;
  releaseDate: Date;
  retailPrice: number;
};

export type RiskSubject = {
  name: string;
  birdDate: Date;
  documentNumber: string;
};

export type CoverageType = {
  id: number;
  identifier: Coverage;
  title: string;
  description: string;
  premium: number;
  selected: boolean;
};
