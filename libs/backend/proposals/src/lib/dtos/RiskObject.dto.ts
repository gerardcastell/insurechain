import { ApiProperty } from '@nestjs/swagger';
import { FuelType, ParkingType } from '@prisma/client';
import { IsString, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class RiskObjectDto {
  @ApiProperty({ default: 'AUDI' })
  @IsString()
  maker: string;

  @ApiProperty({ default: 'A1' })
  @IsString()
  model: string;

  @ApiProperty({ default: 3 })
  @IsNumber()
  numberDoors: number;

  @ApiProperty({
    enum: FuelType,
    enumName: 'FuelType',
    default: FuelType.gasoline,
  })
  @IsString()
  @IsEnum(FuelType)
  fuelType: FuelType;

  @ApiProperty({ default: '120' })
  @IsNumber()
  power: number;

  @ApiProperty({ default: new Date('2018-02-01') })
  @IsDateString()
  purchaseDate: Date;

  @ApiProperty({ default: new Date('2016-02-01') })
  @IsDateString()
  releaseDate: Date;

  @ApiProperty({ default: '1234LLC' })
  @IsString()
  plate: string;

  @ApiProperty({ default: 20750 })
  @IsNumber()
  retailPrice: number;

  @ApiProperty({ default: '1.0 TFSI ACTIVE KIT' })
  @IsString()
  version: string;

  @ApiProperty({ default: 10000 })
  @IsNumber()
  kmsYear: number;

  @ApiProperty({
    enum: ParkingType,
    enumName: 'ParkingType',
    default: ParkingType.garage,
  })
  @IsString()
  @IsEnum(ParkingType)
  parking: ParkingType;
}
