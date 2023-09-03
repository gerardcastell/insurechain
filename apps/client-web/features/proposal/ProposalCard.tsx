import {
  ProposalDto,
  getSellPrice,
} from '@insurechain/web/backend/data-access';
import { Box, Divider, Paper, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import { useRouter } from 'next/router';
type ProposalCardProps = {
  proposal: ProposalDto;
};

const ProposalCard = ({ proposal }: ProposalCardProps) => {
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
  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/dashboard/proposals/${proposal.id}`);
  };

  return (
    <Paper
      elevation={3}
      onClick={handleClick}
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
            <EmojiPeopleIcon fontSize="small" />
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
        <Divider />
        <Box display="flex" alignItems={'center'}>
          <Box mr={3} sx={{ alignSelf: 'flex-start' }}>
            <PriceChangeIcon fontSize="small" />
          </Box>
          <Box mr={3}>
            <Typography
              className="accentOnHover"
              fontWeight={600}
              variant="body1"
              color="secondary.main"
            >
              {monthlyPremiumEth.toFixed(5)} ETH
            </Typography>
            <Typography variant="body2" fontStyle="oblique">
              Equivalent to {monthlyPremium.toLocaleString('es-ES')}€
            </Typography>
          </Box>
          <Typography
            className="accentOnHover"
            typography="body2"
            fontStyle="oblique"
          >
            per month
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProposalCard;
