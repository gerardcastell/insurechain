import { ProposalDto } from '@insurechain/web/backend/data-access';
import { usePolicyContract } from '@insurechain/web/blockchain';
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
  keyframes,
} from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import { formatEther, BigNumberish } from 'ethers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

type Props = {
  address: `0x${string}`;
};
export const PolicyPreview = ({ address }: Props) => {
  const router = useRouter();
  const { data, isError, isFetching } = usePolicyContract(address);
  if (isError || !data) {
    return <Typography color="red">Error fetching owner address</Typography>;
  }
  if (isFetching) {
    return <CircularProgress />;
  }

  const [
    { result: premium },
    { result: startTime },
    { result: endTime },
    { result: policyData },
    { result: isActive },
  ] = data;
  const policy: ProposalDto = JSON.parse(policyData as any);
  const startDate = new Date(1000 * Number(startTime));
  const endDate = new Date(1000 * Number(endTime));
  const ethersPaid = formatEther(premium as unknown as BigNumberish);

  const handleClick = (e) => {
    e.preventDefault();
    router.push(`/dashboard/policies/${address}`);
  };

  const riskObject = `${policy.riskObject.maker} ${policy.riskObject.model} ${policy.riskObject.version}`;

  const addressShortFormat = `${address?.substring(
    0,
    6
  )}...${address?.substring(address.length - 6)}`;
  const riskSubjectBirthDate = new Date(policy.riskSubject.birthDate);

  return (
    <Paper
      elevation={3}
      onClick={handleClick}
      sx={{
        position: 'relative',
        height: '100%',

        '::before': {
          opacity: 0.7,
          backgroundImage:
            'linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          content: '""',
          width: '80%',
          height: '80%',
          position: 'absolute',
          zIndex: -1,
          borderRadius: '1em',
          filter: 'blur(20px)',
          transition: 'all 0.3s ease-in-out',
        },
        '&:hover': {
          cursor: 'pointer',
          '::before': {
            width: '110%',
            height: '110%',
          },
        },
      }}
    >
      {!isActive && (
        <>
          <Paper
            sx={{
              transition: 'all 0.2s ease-in-out',
              position: 'absolute',
              background: 'linear-gradient(to right bottom, #f9b16e, #f68080)',
              color: 'white',
              padding: 2,
              zIndex: 1,
              borderRadius: 1,
              width: '90%',
              textAlign: 'center',
              top: '76%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
            }}
          >
            <Typography
              textTransform="uppercase"
              fontWeight={500}
              fontStyle="oblique"
            >
              Cancelled
            </Typography>
          </Paper>
          <Chip
            sx={{
              opacity: 0,
              transition: 'all 0.2s ease-in-out',
              position: 'absolute',
              padding: 1,
              zIndex: 1,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              whiteSpace: 'nowrap',
              '&:hover': {
                cursor: 'pointer',
              },
            }}
            label={'Click to visit'}
            color="primary"
          ></Chip>
        </>
      )}
      <Stack
        sx={{
          opacity: isActive ? 1 : 0.5,
        }}
        spacing={2}
        padding={2}
      >
        <Box>
          <Typography
            className="accentOnHover"
            fontWeight={500}
            fontStyle="oblique"
            color="GrayText"
          >
            Policy Id: {policy.id}
          </Typography>
          <Divider className="accentOnHover" />
        </Box>
        <Box display="flex" alignItems="flex-end">
          <Box mr={1}>
            <AccountBalanceIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="body2">
              Address: {addressShortFormat.toLocaleLowerCase()}
            </Typography>
          </Box>
        </Box>
        <Divider />
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
              {policy.riskSubject.name}
            </Typography>
            <Typography variant="body2">
              {policy.riskSubject.documentNumber}
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
        <Box display={'flex'}>
          <Box mr={1}>
            <CalendarMonthIcon fontSize="small" />
          </Box>
          <Box>
            <Typography
              variant="body2"
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
            >
              Valid from: {startDate.toLocaleDateString('en-GB')}
            </Typography>
            <Typography
              variant="body2"
              sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
            >
              Active until: {endDate.toLocaleDateString('en-GB')}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box display={'flex'} alignItems="flex-end">
          <Box mr={1}>
            <PaymentsIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="body2">{ethersPaid} ETH</Typography>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};
