import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, isNumber, IsString } from 'class-validator';

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
  purchaseDate: string;

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
  birthDate: string;
}

// enum CoverageType {
//   thirdPartyLiability,
//   wildlifeCollision,
//   theft,
//   roadsideAssistance,
//   fireWindscreen,
//   vehicleDamages,
//   replacementVehicle,
// }
class CoverageSetup {
  @ApiProperty()
  @IsBoolean()
  thirdPartyLiability?: boolean;

  @ApiProperty()
  @IsBoolean()
  wildlifeCollision?: boolean;

  @ApiProperty()
  @IsBoolean()
  theft?: boolean;

  @ApiProperty()
  @IsBoolean()
  roadsideAssistance?: boolean;

  @ApiProperty()
  @IsBoolean()
  fireWindscreen?: boolean;

  @ApiProperty()
  @IsBoolean()
  vehicleDamages?: boolean;

  @ApiProperty()
  @IsBoolean()
  replacementVehicle?: boolean;
}
export class CreateProposalDto {
  @ApiProperty()
  riskObject: RiskObject;
  @ApiProperty()
  riskSubject: RiskSubject;
  @ApiProperty()
  coverages?: CoverageSetup;
}
