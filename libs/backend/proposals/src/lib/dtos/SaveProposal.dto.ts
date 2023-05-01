import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  ArrayMinSize,
  ValidateNested,
  IsObject,
  IsDefined,
} from 'class-validator';
import { RiskObjectDto } from './RiskObject.dto';
import { RiskSubjectDto } from './RiskSubject.dto';
import { CoverageDto } from './CoverageType.dto';
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
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => RiskObjectDto)
  riskObject: RiskObjectDto;

  @ApiProperty()
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => RiskSubjectDto)
  riskSubject: RiskSubjectDto;

  @ApiProperty({ isArray: true, type: CoverageDto })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CoverageDto)
  coverages: CoverageDto[];
}
