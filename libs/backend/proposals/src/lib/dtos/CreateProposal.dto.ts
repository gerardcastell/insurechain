import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class CreateproposalDto {
  riskObject: RiskObject;
  riskSubject: RiskSubject;
  coverages?: CoverageSetup;
}

class RiskObject {
  @ApiProperty()
  @IsString()
  model: string;
  fuelType: string;
  power: number;
  purchaseDate: string;
  plate: string;
  kmsYear: number;
  parking: string;
}

class RiskSubject {
  name: string;
  licenseType: string;
  documentNumber: string;
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
