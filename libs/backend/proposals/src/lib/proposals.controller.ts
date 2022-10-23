import { Body, Controller, Post } from '@nestjs/common';
import { CreateproposalDto } from './dtos/CreateProposal.dto';

@Controller('proposals')
export class ProposalsController {
  @Post('quote')
  createProposal(@Body() body: CreateproposalDto) {
    console.log(body);
  }
}
