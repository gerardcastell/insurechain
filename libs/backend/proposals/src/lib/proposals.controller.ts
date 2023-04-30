import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProposalDto } from './dtos/CreateProposal.dto';
import { BackendProposalsService } from './backend-proposals.service';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: BackendProposalsService) {}

  @Post('quote')
  quote(@Body() { riskObject, riskSubject, coverages }: CreateProposalDto) {
    return this.proposalsService.quote(riskObject, riskSubject, coverages);
  }
}
