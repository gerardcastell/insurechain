import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsObject, IsOptional } from 'class-validator';
import { RiskObjectDto } from './RiskObject.dto';
import { RiskSubjectDto } from './RiskSubject.dto';
import { Coverage } from '@prisma/client';
export class QuoteDto {
  @ApiProperty({ type: () => RiskObjectDto })
  @IsObject()
  riskObject: RiskObjectDto;

  @ApiProperty({ type: () => RiskSubjectDto })
  @IsObject()
  riskSubject: RiskSubjectDto;

  @ApiProperty({ default: [Coverage.theft] })
  @IsEnum(Coverage, { each: true })
  @IsArray()
  @IsOptional()
  coverages: Coverage[];
}
