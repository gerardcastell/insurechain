import axios from '../axios';
import {
  GetVersionsPayload,
  MakerDto,
  ModelVersionDto,
  VersionDto,
} from './types';

export const getMakers = async (maker: string): Promise<MakerDto[]> => {
  const response = await axios.get<{ data: MakerDto[] }>(
    `${process.env.NEXT_PUBLIC_THIRD_PARTY_CAR_API}/api/car/v1/risk-objects/models/makers`,
    { params: { maker } }
  );
  return response?.data.data;
};

export const getVersions = async (
  payload: GetVersionsPayload
): Promise<VersionDto[]> => {
  const response = await axios.post<ModelVersionDto>(
    `${process.env.NEXT_PUBLIC_THIRD_PARTY_CAR_API}/api/car/v1/risk-objects/models/versions`,
    {}
  );
  return response.data.modelVersions;
};
