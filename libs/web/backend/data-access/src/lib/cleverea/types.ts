import type { FuelType } from '@prisma/client';
export interface MakerDto {
  maker: string;
  models: string[];
}

export interface GetVersionsPayload {
  maker: string;
  model: string;
  fuelType?: FuelType;
  numberDoors?: number;
  power?: number;
}

export interface ModelVersionDto {
  modelVersions: VersionDto[];
}

export interface VersionDto {
  fuelType: FuelType;
  id: number;
  maker: string;
  makerId: string;
  model: string;
  modelId: string;
  numberDoors: number;
  power: number;
  releaseDate: Date;
  retailPrice: number;
  subtype: string;
  type: string;
  version: string;
  versionId: string;
}
