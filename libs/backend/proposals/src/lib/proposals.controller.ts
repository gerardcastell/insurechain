import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProposalDto } from './dtos/CreateProposal.dto';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  @Post('quote')
  createProposal(@Body() body: CreateProposalDto) {
    console.log(body);
  }
}
