import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@insurechain/backend/users';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  getData() {
    return this.appService.getData();
  }
}
