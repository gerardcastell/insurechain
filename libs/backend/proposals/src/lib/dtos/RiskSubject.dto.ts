import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RiskSubject {
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
