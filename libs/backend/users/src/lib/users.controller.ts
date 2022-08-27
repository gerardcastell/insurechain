import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class UsersController {
  @Get('hola')
  hola() {
    return { hola: 'hola' };
  }
}
