import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { QuoteDto } from './dtos/Quote.dto';
import { BackendProposalsService } from './backend-proposals.service';
import { JwtAuthGuard } from '@insurechain/backend/users';
import { SaveProposalDto } from './dtos/SaveProposal.dto';
import { UploadToBlockchainDto } from './dtos/UploadToBlockchain.dto';

@ApiTags('Proposals')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: BackendProposalsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('')
  getProposals(@Request() req) {
    return this.proposalsService.getProposals(req.user.userId);
  }

  @Post('quote')
  quote(@Body() { riskObject, riskSubject, coverages }: QuoteDto) {
    return this.proposalsService.quote(riskObject, riskSubject, coverages);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('save-proposal')
  saveProposal(@Body() body: SaveProposalDto, @Request() req) {
    const { riskObject, riskSubject, coverages } = body;
    return this.proposalsService.saveProposal(
      req.user.userId,
      riskObject,
      riskSubject,
      coverages
    );
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiParam({ name: 'proposalId', type: 'number' })
  @Patch('blockchain/:proposalId')
  uploadToBlockchain(
    @Body() { address }: UploadToBlockchainDto,
    @Param('proposalId') proposalId
  ) {
    return this.proposalsService.uploadToBlockchain(
      parseInt(proposalId),
      address
    );
  }
}
