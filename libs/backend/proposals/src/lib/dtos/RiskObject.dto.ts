import { ApiProperty } from '@nestjs/swagger';
import { FuelType, ParkingType } from '@prisma/client';
import { IsString, IsNumber } from 'class-validator';

export class RiskObject {
  @ApiProperty()
  @IsString()
  maker: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsNumber()
  doorsNumber: number;

  @ApiProperty()
  @ApiProperty()
  @IsString()
  fuelType: FuelType;

  @ApiProperty()
  @IsNumber()
  power: number;

  @ApiProperty()
  @IsString()
  purchaseDate: Date;

  @ApiProperty()
  @IsString()
  releaseDate: Date;

  @ApiProperty()
  @IsString()
  plate: string;

  @ApiProperty()
  @IsNumber()
  retailPrice: number;

  @ApiProperty()
  @IsString()
  version: string;

  @ApiProperty()
  @IsNumber()
  kmsYear: number;

  @ApiProperty()
  @IsString()
  parking: ParkingType;
}
