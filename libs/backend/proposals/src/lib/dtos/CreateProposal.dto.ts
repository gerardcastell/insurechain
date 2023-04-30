import { ApiProperty } from '@nestjs/swagger';
import { Coverage } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

class RiskObject {
  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsString()
  fuelType: string;

  @ApiProperty()
  @IsNumber()
  power: number;

  @ApiProperty()
  @IsString()
  purchaseDate: Date;

  @ApiProperty()
  @IsString()
  plate: string;

  @ApiProperty()
  @IsNumber()
  kmsYear: number;

  @ApiProperty()
  @IsString()
  parking: string;
}

class RiskSubject {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  licenseType: string;

  @ApiProperty()
  @IsString()
  documentNumber: string;

  @ApiProperty()
  @IsString()
  birthDate: Date;
}

export class CreateProposalDto {
  @ApiProperty()
  riskObject: RiskObject;
  @ApiProperty()
  riskSubject: RiskSubject;
  @ApiProperty({ enumName: 'Coverage', enum: Coverage, isArray: true })
  @IsEnum(Coverage, { each: true })
  coverages: Coverage[];
}
