import {
  ProposalDto,
  getSellPrice,
} from '@insurechain/web/backend/data-access';
import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import PaymentsIcon from '@mui/icons-material/Payments';
type ProposalCardProps = {
  proposal: ProposalDto;
};

const ProposalCard = ({ proposal }: ProposalCardProps) => {
  console.log(proposal);
  const { data: ethPrice } = useQuery({
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
    <Paper
      elevation={3}
      component={Box}
      width={'270px'}
      sx={{
        '&:hover': {
          cursor: 'pointer',
          backgroundColor: 'secondary.light',
          color: 'white',
          transition: 'all 0.3s ease-in-out',
          '& .accentOnHover': {
            color: 'white',
          },
        },
      }}
    >
      <Stack spacing={2} padding={2}>
        <Box>
          <Typography
            className="accentOnHover"
            fontWeight={500}
            fontStyle="oblique"
            color="GrayText"
          >
            Proposal ID: {proposal.id}
          </Typography>
          <Divider className="accentOnHover" />
        </Box>
        <Box display="flex" alignItems="flex-end">
          <Box mr={1}>
            <DirectionsCarOutlinedIcon fontSize="small" />
          </Box>
          <Typography variant="body2" noWrap fontWeight={450}>
            {riskObject}
          </Typography>
        </Box>
        <Box display="flex">
          <Box mr={1}>
            <AirlineSeatReclineNormalIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="body2" noWrap>
              {proposal.riskSubject.name}
            </Typography>
            <Typography variant="body2">
              {proposal.riskSubject.documentNumber}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
            >
              {`Birth date: ${riskSubjectBirthDate.toLocaleDateString(
                'es-ES'
              )}`}
            </Typography>
          </Box>
        </Box>
        <Box display="flex">
          <Box mr={1}>
            <PriceChangeIcon fontSize="small" />
          </Box>
          <Box>
            <Typography fontWeight={500}>
              {monthlyPremium.toLocaleString('es-ES')}€/month
            </Typography>
            <Typography fontWeight={500}>
              {monthlyPremiumEth.toFixed(5)} ETH/month
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProposalCard;
