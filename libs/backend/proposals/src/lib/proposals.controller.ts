import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { QuoteDto } from './dtos/CreateProposal.dto';
import { BackendProposalsService } from './backend-proposals.service';
import { JwtAuthGuard } from '@insurechain/backend/users';
import { SaveProposalDto } from './dtos/SaveProposal.dto';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: BackendProposalsService) {}

  @Post('quote')
  quote(@Body() { riskObject, riskSubject, coverages }: QuoteDto) {
    return this.proposalsService.quote(riskObject, riskSubject, coverages);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('save-proposal')
  saveProposal(
    @Request() req,
    @Body() { riskObject, riskSubject, coverages }: SaveProposalDto
  ) {
    return this.proposalsService.saveProposal(
      req.user.userId,
      riskObject,
      riskSubject,
      coverages
    );
  }
}
