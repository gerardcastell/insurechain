import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RiskSubject {
  @ApiProperty({ default: 'Gerard' })
  @IsString()
  name: string;

  @ApiProperty({ default: '11111111H' })
  @IsString()
  documentNumber: string;

  @ApiProperty({ default: new Date('1990-01-01') })
  @IsString()
  birthDate: Date;
}
