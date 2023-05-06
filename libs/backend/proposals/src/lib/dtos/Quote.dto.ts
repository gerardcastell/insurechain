import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDefined,
  IsEnum,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { RiskObjectDto } from './RiskObject.dto';
import { RiskSubjectDto } from './RiskSubject.dto';
import { Coverage } from '@prisma/client';
import { Type } from 'class-transformer';
export class QuoteDto {
  @ApiProperty({ type: () => RiskObjectDto })
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => RiskObjectDto)
  riskObject: RiskObjectDto;

  @ApiProperty({ type: () => RiskSubjectDto })
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => RiskSubjectDto)
  riskSubject: RiskSubjectDto;

  @ApiProperty({ default: [Coverage.theft] })
  @IsEnum(Coverage, { each: true })
  @IsArray()
  @IsOptional()
  coverages: Coverage[];
}
