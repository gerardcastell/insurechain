import { ApiProperty } from '@nestjs/swagger';
import { Coverage, RiskObject, RiskSubject } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class QuoteDto {
  @ApiProperty()
  riskObject: RiskObject;
  @ApiProperty()
  riskSubject: RiskSubject;
  @ApiProperty({ enumName: 'Coverage', enum: Coverage, isArray: true })
  @IsEnum(Coverage, { each: true })
  coverages: Coverage[];
}
