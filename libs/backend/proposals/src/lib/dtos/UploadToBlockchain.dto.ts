import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsHexadecimal, IsString } from 'class-validator';

export class UploadToBlockchainDto {
  @ApiProperty({ default: '0xc0ffee254729296a45a3885639AC7E10F9d54979' })
  @IsDefined()
  @IsString()
  @IsHexadecimal()
  address: string;
}
