import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ArrayMinSize } from 'class-validator';
import { CoverageType } from './CoverageType.dto';
import { RiskObject } from './RiskObject.dto';
import { RiskSubject } from './RiskSubject.dto';

const getTodayAndAddYears = (years: number) => {
  const today = new Date();
  today.setFullYear(today.getFullYear() + years);
  return today;
};

export class SaveProposalDto {
  @ApiProperty({ default: getTodayAndAddYears(1) })
  endDate: Date;
  @ApiProperty({ default: new Date() })
  effectiveDate: Date;
  @ApiProperty()
  riskObject: RiskObject;
  @ApiProperty()
  riskSubject: RiskSubject;

  @ApiProperty({ isArray: true, type: CoverageType })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => CoverageType)
  coverages: CoverageType[];
}
