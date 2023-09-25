import { ParkingType } from '@prisma/client';

export const PARKING_TYPE: Record<ParkingType, string> = {
  [ParkingType.garage]: 'Individual garage',
  [ParkingType.street]: 'Street',
  [ParkingType.collective_car_park]: 'Unguarded collective garage',
  [ParkingType.collective_car_park_surveillance]: 'Guarded Collective garage',
} as const;
