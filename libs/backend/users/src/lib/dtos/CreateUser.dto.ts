import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class UserDto {
  @ApiProperty({ example: 'gerard@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsString()
  password: string;
}
