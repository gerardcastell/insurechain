import { ApiProperty } from '@nestjs/swagger';
import { IsHexadecimal } from 'class-validator';
export class UserDto {
  @ApiProperty({ example: '0xbf3E4a304b2156832e842eebF677D029a2C61325' })
  @IsHexadecimal()
  address: string;
}
