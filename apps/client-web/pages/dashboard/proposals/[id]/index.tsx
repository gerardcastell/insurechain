import { ProposalDto, getProposal } from '@insurechain/web/backend/data-access';
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Slide,
  Slider,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import PopoverOnHover from '../../../../features/proposal/PopoverOnHover';
import { grey } from '@mui/material/colors';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaymentsIcon from '@mui/icons-material/Payments';
import PurchaseButton from '../../../../features/proposal/purchase-button/PurchaseButton';
import { BackLink } from '@insurechain/web/ui-elements';
import { useEtherUtils, useFactoryContract } from '@insurechain/web/blockchain';
import { PARKING_TYPE } from '@insurechain/web/constants';
const DataPresenter = ({
  title,
  value,
  sx,
}: {
  title: string;
  value: string;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box>
      <Typography variant="body2" mr={1} color={grey[500]}>
        {title}
      </Typography>
      <Typography variant="body1" sx={sx} noWrap>
        {value}
      </Typography>
    </Box>
  );
};

export const getServerSideProps = async ({ req, res, params }) => {
  const session = await getServerSession(req, res, authOptions);
  const proposalId = params?.id as string;
  if (!session?.access_token) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    };
  }
  if (!proposalId) {
    return {
      redirect: {
        destination: '/dashboard/proposals',
        permanent: false,
      },
    };
  }

  try {
    const response = await getProposal(
      proposalId,
      session.access_token as string
    );
    const proposal = response.data;
    return { props: { proposal } };
  } catch (e) {
    return {
      redirect: {
        destination: '/dashboard/proposals',
        permanent: false,
      },
    };
  }
};

const marks = [
  {
    value: 1,
    label: '1 month',
  },
  {
    value: 3,
    label: '3 months',
  },
  {
    value: 6,
    label: '6 months',
  },
  {
    value: 9,
    label: '9 months',
  },
  {
    value: 12,
    label: '12 months',
  },
];

const DEFAULT_MONTH_AMOUNT = 3;

function valuetext(value: number) {
  return value === 1 ? `${value} month` : `${value} months`;
}

const ProposalPage = ({ proposal }: { proposal: ProposalDto }) => {
  const [monthAmount, setMonthAmount] = useState<number>(DEFAULT_MONTH_AMOUNT);

  const { write, data, isLoading, isSuccess } = useFactoryContract(
    monthAmount,
    proposal
  );
  console.log({ data, isLoading, isSuccess });

  const { convertEurosToEthers } = useEtherUtils();

  const purchaseDate = new Date(proposal.riskObject.purchaseDate);
  const riskObject = `${proposal.riskObject.maker} ${proposal.riskObject.model} ${proposal.riskObject.version}`;

  const monthlyPremium = proposal.coverages.reduce(
    (acc, coverage) => acc + coverage.monthlyPremium,
    0
  );
  const monthlyPremiumEth = convertEurosToEthers(monthlyPremium);
  const totalPremiumEth = monthlyPremiumEth * monthAmount;

  const onClickPurchaseProposal = async () => {
    write?.();
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setMonthAmount(newValue as number);
  };

  const getDate = (monthAmount: number): Date => {
    const date = new Date();
    date.setMonth(date.getMonth() + monthAmount);
    return date;
  };

  return (
    <Container maxWidth="md" sx={{ marginY: 4 }}>
      <BackLink text="Back to proposals" link="/dashboard/proposals" />
      <Slide direction="up" in={true}>
        <Stack spacing={4} sx={{ marginY: 4 }}>
          <Paper component={Box} padding={2}>
            <Stack spacing={3} direction="column">
              <Typography fontWeight={500}>
                Proposal ID: {proposal.id}
              </Typography>
              <Grid container rowGap={1}>
                <Grid item xs={12} display={'flex'} alignItems={'flex-end'}>
                  <Box mr={1}>
                    <DirectionsCarOutlinedIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2" fontStyle={'oblique'}>
                    Risk Object
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DataPresenter title="Maker & Model" value={riskObject} />
                </Grid>
                <Grid item xs={4} sm={2}>
                  <DataPresenter
                    title="Plate"
                    value={proposal.riskObject.plate}
                  />
                </Grid>
                <Grid item xs={4} sm={2}>
                  <DataPresenter
                    title="Fuel Type"
                    value={proposal.riskObject.fuelType}
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <DataPresenter
                    title="Power"
                    value={proposal.riskObject.power.toString()}
                  />
                </Grid>
                <Grid item xs={2} sm={1}>
                  <DataPresenter
                    title="Doors"
                    value={proposal.riskObject.numberDoors.toString()}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DataPresenter
                    title="Version"
                    value={proposal.riskObject.version}
                  />
                </Grid>
                <Grid item xs={4} sm={4}>
                  <DataPresenter
                    title="Parking"
                    value={PARKING_TYPE[proposal.riskObject.parking]}
                  />
                </Grid>
                <Grid item xs={4} sm={2}>
                  <DataPresenter
                    title="Kms per year"
                    value={proposal.riskObject.kmsYear.toString()}
                  />
                </Grid>
                <Grid item xs={4} sm={2}>
                  <DataPresenter
                    title="Purchase date"
                    value={purchaseDate.toLocaleDateString('en-GB')}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid container rowGap={1}>
                <Grid item xs={12} display={'flex'} alignItems={'flex-end'}>
                  <Box mr={1}>
                    <EmojiPeopleIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2" fontStyle={'oblique'}>
                    Risk Subject
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DataPresenter
                    title="Name"
                    value={proposal.riskSubject.name}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <DataPresenter
                    title="Document Number"
                    value={proposal.riskSubject.documentNumber}
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <DataPresenter
                    title="Birth date"
                    value={new Date(
                      proposal.riskSubject.birthDate
                    ).toLocaleDateString('en-GB')}
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid container>
                <Grid
                  item
                  xs={6}
                  marginBottom={1}
                  display={'flex'}
                  alignItems={'flex-end'}
                >
                  <Box mr={1}>
                    <VerifiedUserIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2" fontStyle={'oblique'}>
                    Coverages
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="body2"
                    fontStyle={'oblique'}
                    textAlign={'right'}
                  >
                    Monthly premium
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="body2"
                    fontStyle={'oblique'}
                    textAlign={'right'}
                  >
                    Ethers
                  </Typography>
                </Grid>

                {proposal.coverages.map((coverage) => (
                  <React.Fragment key={coverage.id}>
                    <Grid item xs={6}>
                      <PopoverOnHover
                        text={coverage.title}
                        popoverText={coverage.description}
                      />
                    </Grid>
                    <Grid item xs={3} sm={2}>
                      <Typography variant="body1" textAlign={'right'}>
                        {coverage.monthlyPremium.toLocaleString('es-ES')}€
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="body1" textAlign={'right'}>
                        {convertEurosToEthers(coverage.monthlyPremium).toFixed(
                          8
                        )}{' '}
                        ETH
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
              <Divider />
              <Grid container>
                <Grid item xs={6} display={'flex'} alignItems={'flex-end'}>
                  <Box mr={1}>
                    <PaymentsIcon fontSize="small" />
                  </Box>
                  <Typography variant="body2">Total monthly premium</Typography>
                </Grid>
                <Grid item xs={3} sm={2}>
                  <Typography variant="body1" textAlign={'right'}>
                    {monthlyPremium.toLocaleString('es-ES')}€
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    textAlign={'right'}
                  >
                    {totalPremiumEth.toFixed(8)} ETH
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
          <Stack spacing={2} mt={2}>
            <Typography variant="h6" textAlign={'center'}>
              How many month do you want to be covered?
            </Typography>
            <Typography variant="body2" textAlign={'center'}>
              You will be covered until{' '}
              {getDate(monthAmount).toLocaleDateString('en-GB')}
            </Typography>
            <Slider
              aria-label="Month amount"
              defaultValue={DEFAULT_MONTH_AMOUNT}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={12}
              onChange={handleChange}
            />
          </Stack>
          <Box display={'flex'} justifyContent={'center'}>
            <Stack
              direction={'column'}
              pt={3}
              spacing={2}
              maxWidth={'sm'}
              sx={{ margin: '0 auto' }}
            >
              <Typography textAlign={'center'}>
                You will pay {totalPremiumEth.toFixed(8)} ETH
              </Typography>
              <PurchaseButton onClick={() => onClickPurchaseProposal()} />
            </Stack>
          </Box>
        </Stack>
      </Slide>
    </Container>
  );
};

export default ProposalPage;
