import { Coverage, ParkingType } from '@prisma/client';

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
  defineCoverages: (coverages: Omit<CoverageType, 'selected'>[]) => void;
  switchCoverage: (id: number) => void;
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
  parking: ParkingType;
  releaseDate: Date;
  retailPrice: number;
};

export type RiskSubject = {
  name: string;
  birthDate: Date;
  documentNumber: string;
};

export type CoverageType = {
  id: number;
  identifier: Coverage;
  title: string;
  description: string;
  monthlyPremium: number;
  selected: boolean;
};
