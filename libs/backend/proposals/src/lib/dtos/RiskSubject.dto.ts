import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDefined, IsString } from 'class-validator';

export class RiskSubjectDto {
  @ApiProperty({ default: 'Gerard' })
  @IsString()
  name: string;

  @ApiProperty({ default: '11111111H', required: true })
  @IsDefined()
  @IsString()
  documentNumber: string;

  @ApiProperty({ default: new Date('1990-01-01') })
  @IsDate()
  birthDate: Date;
}
