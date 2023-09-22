import {
  ProposalDto,
  getProposal,
  getSellPrice,
} from '@insurechain/web/backend/data-access';
import {
  Box,
  Container,
  Divider,
  Grid,
  Paper,
  Slide,
  Stack,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import React from 'react';
// import PopoverOnHover from './PopoverOnHover';
import { useQuery } from '@tanstack/react-query';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../../api/auth/[...nextauth]';
import PopoverOnHover from '../../../../features/proposal/PopoverOnHover';
import { ParkingType } from '@prisma/client';
import { grey } from '@mui/material/colors';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaymentsIcon from '@mui/icons-material/Payments';
import PurchaseButton from '../../../../features/proposal/purchase-button/PurchaseButton';
import { BackLink } from '@insurechain/web/ui-elements';
import { useFactoryContract } from '@insurechain/web/blockchain';
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

const ProposalPage = ({ proposal }: { proposal: ProposalDto }) => {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 2);
  const unixTimestamp = Math.floor(currentDate.getTime() / 1000); // Convert to seconds
  const { write, data, isLoading, isSuccess } =
    useFactoryContract(unixTimestamp);
  console.log({ data, isLoading, isSuccess });
  const { data: ethPrice } = useQuery({
    queryKey: ['getCurrency'],
    queryFn: () => getSellPrice(),
    staleTime: 1000 * 60,
  });
  const purchaseDate = new Date(proposal.riskObject.purchaseDate);
  const riskObject = `${proposal.riskObject.maker} ${proposal.riskObject.model} ${proposal.riskObject.version}`;
  const PARKING_TYPE: Record<ParkingType, string> = {
    [ParkingType.garage]: 'Individual garage',
    [ParkingType.street]: 'Street',
    [ParkingType.collective_car_park]: 'Unguarded collective garage',
    [ParkingType.collective_car_park_surveillance]: 'Guarded Collective garage',
  } as const;
  const monthlyPremium = proposal.coverages.reduce(
    (acc, coverage) => acc + coverage.monthlyPremium,
    0
  );
  const monthlyPremiumEth = monthlyPremium / ethPrice;
  const onClickPurchaseProposal = async () => {
    write?.();
  };
  return (
    <Container maxWidth="md" sx={{ marginY: 4 }}>
      <BackLink text="Back to proposals" link="/dashboard/proposals" />
      <Slide direction="up" in={true}>
        <Box sx={{ marginY: 4 }}>
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
                        {(coverage.monthlyPremium / ethPrice).toFixed(8)} ETH
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
                    {monthlyPremiumEth.toFixed(8)} ETH
                  </Typography>
                </Grid>
              </Grid>
            </Stack>
          </Paper>
          <Box display={'flex'} justifyContent={'center'} my={3}>
            <PurchaseButton onClick={() => onClickPurchaseProposal()} />
          </Box>
          <Typography>
            Factory address: {process.env.NEXT_PUBLIC_FACTORY_CONTRACT_ADDRESS}
          </Typography>
        </Box>
      </Slide>
    </Container>
  );
};

export default ProposalPage;
