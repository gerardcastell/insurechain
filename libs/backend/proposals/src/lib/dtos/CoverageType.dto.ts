import { ApiProperty } from '@nestjs/swagger';
import { Coverage } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CoverageDto {
  @ApiProperty({ enum: Coverage, enumName: 'Coverage' })
  @IsEnum(Coverage)
  identifier: Coverage;

  @ApiProperty({ default: 10, required: true })
  @IsNumber()
  monthlyPremium: number;

  @ApiProperty({ default: 'Theft' })
  @IsString()
  title: string;

  @ApiProperty({ default: 'Theft of the insured vehicle.' })
  @IsString()
  description: string;
}
