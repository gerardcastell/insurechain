import {
  ProposalDto,
  getSellPrice,
} from '@insurechain/web/backend/data-access';
import { Box, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import PopoverOnHover from './PopoverOnHover';
import { useQuery } from '@tanstack/react-query';

type ProposalCardProps = {
  proposal: ProposalDto;
};

const ProposalCard = ({ proposal }: ProposalCardProps) => {
  console.log(proposal);
  const { isLoading, data: ethPrice } = useQuery({
    queryKey: ['getCurrency'],
    queryFn: () => getSellPrice(),
    cacheTime: 1000 * 60,
  });
  const riskSubjectBirthDate = new Date(proposal.riskSubject.birthDate);
  const riskObject = `${proposal.riskObject.maker} ${proposal.riskObject.model} ${proposal.riskObject.version}`;
  const monthlyPremium = proposal.coverages.reduce(
    (acc, coverage) => acc + coverage.monthlyPremium,
    0
  );
  const monthlyPremiumEth = monthlyPremium / ethPrice;
  return (
    <Paper>
      <Grid container spacing={1} p={2} sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <Typography fontWeight={500}>Proposal ID: {proposal.id}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {riskObject}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="body2"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {proposal.riskSubject.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {proposal.riskSubject.documentNumber}
          </Typography>
          <Typography
            variant="body2"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {`Birth date: ${riskSubjectBirthDate.toLocaleDateString('es-ES')}`}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontWeight={500}>
            {monthlyPremium.toLocaleString('es-ES')}€/month
          </Typography>
          <Typography fontWeight={500}>
            {monthlyPremiumEth.toFixed(5)} ETH/month
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProposalCard;
