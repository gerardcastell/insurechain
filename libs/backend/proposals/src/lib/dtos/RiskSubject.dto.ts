import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsString } from 'class-validator';

export class RiskSubjectDto {
  @ApiProperty({ default: 'Gerard' })
  @IsString()
  name: string;

  @ApiProperty({ default: '11111111H', required: true })
  @IsDefined()
  @IsString()
  documentNumber: string;

  @ApiProperty({ default: new Date('1990-01-01') })
  @IsDateString()
  birthDate: Date;
}
