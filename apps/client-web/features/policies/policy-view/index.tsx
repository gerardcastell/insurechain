import { useEtherUtils, usePolicyContract } from '@insurechain/web/blockchain';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Fade,
  Grid,
  Paper,
  Slide,
  Stack,
  Typography,
} from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { PageLayout as UiPageLayout } from '@insurechain/web/ui-elements';
import { BigNumberish, formatEther } from 'ethers';
import { ProposalDto } from '@insurechain/web/backend/data-access';
import DirectionsCarOutlinedIcon from '@mui/icons-material/DirectionsCarOutlined';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PaymentsIcon from '@mui/icons-material/Payments';
import { PARKING_TYPE } from '@insurechain/web/constants';
import { DataPresenter } from '../../proposal/DataPresenter';
import PopoverOnHover from '../../proposal/PopoverOnHover';
import { useRouter } from 'next/router';
import CancelModal from './CancelModal';
import { toast } from 'react-toastify';

const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <UiPageLayout
      backLink={{ text: 'Back to policies', link: '/dashboard/policies' }}
    >
      {children}
    </UiPageLayout>
  );
};
type Props = {
  address: `0x${string}`;
};

export const PolicyView = ({ address }: Props) => {
  const [cancelModalOpen, setCancelModalOpen] = React.useState(false);
  const { data, isError, isFetching, refetch } = usePolicyContract(address);
  const router = useRouter();
  const { convertEurosToEthers, convertEthersToEuros } = useEtherUtils();

  if (isError) {
    return (
      <PageLayout>
        <Typography color="red">
          Error ocurred while fetching user policies
        </Typography>
        ;
      </PageLayout>
    );
  }

  if (isFetching) {
    return (
      <PageLayout>
        <CircularProgress />
      </PageLayout>
    );
  }
  if (!data) {
    return (
      <PageLayout>
        <Stack spacing={2} alignItems={'center'}>
          <Typography variant="h6">
            You don&rsquo;t have any policies yet
          </Typography>
          <Typography variant="body1">
            Purchase your first policy to start and you will find it here
          </Typography>
          <Button
            variant="outlined"
            onClick={() => router.push('/dashboard/proposals')}
          >
            Purchase proposal
          </Button>
        </Stack>
      </PageLayout>
    );
  }
  const hasFailedLoading = data.some((r) => r.status === 'failure');
  if (hasFailedLoading) {
    router.push('/dashboard/policies');
  }
  const [
    { result: premium },
    { result: startTime },
    { result: endTime },
    { result: policyData },
    { result: isActive },
  ] = data;
  const isPolicyCancelled = !isActive;

  const policy: ProposalDto = JSON.parse(policyData as any);
  const startDate = new Date(1000 * Number(startTime));
  const endDate = new Date(1000 * Number(endTime));
  const ethersPaid = formatEther(premium as unknown as BigNumberish);
  const riskObject = `${policy.riskObject.maker} ${policy.riskObject.model} ${policy.riskObject.version}`;
  const monthlyPremium = policy.coverages.reduce(
    (acc, coverage) => acc + coverage.monthlyPremium,
    0
  );
  const totalPremium = convertEthersToEuros(+ethersPaid);
  const monthlyPremiumEth = convertEurosToEthers(monthlyPremium);
  const purchaseDate = new Date(policy.riskObject.purchaseDate);

  return (
    <PageLayout>
      <Typography mb={4} variant="h4">
        Policy detail
      </Typography>
      <Box display={'flex'} gap={2}>
        <Box flexBasis={{ xs: '100%', sm: '80%' }} flexGrow={1} flexShrink={0}>
          <Fade in={true}>
            <Paper
              component={Box}
              padding={2}
              width="100%"
              sx={{
                position: 'relative',
              }}
            >
              {isPolicyCancelled && (
                <Slide direction="down" in={true}>
                  <Paper
                    sx={{
                      position: 'absolute',
                      background:
                        'linear-gradient(to right bottom, #f9b16e, #f68080)',
                      color: 'white',
                      padding: 2,
                      borderRadius: 1,
                      right: '1rem',
                      top: '1rem',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <Typography fontWeight={600} fontStyle="oblique">
                      Cancelled on {endDate.toLocaleDateString('en-GB')}
                    </Typography>
                  </Paper>
                </Slide>
              )}
              <Stack
                spacing={3}
                direction="column"
                sx={{
                  opacity: isPolicyCancelled ? 0.6 : 1,
                }}
              >
                <Typography fontWeight={500}>Policy ID: {policy.id}</Typography>
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
                      value={policy.riskObject.plate.toUpperCase()}
                    />
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <DataPresenter
                      title="Fuel Type"
                      value={policy.riskObject.fuelType}
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </Grid>
                  <Grid item xs={2} sm={1}>
                    <DataPresenter
                      title="Power"
                      value={policy.riskObject.power.toString()}
                    />
                  </Grid>
                  <Grid item xs={2} sm={1}>
                    <DataPresenter
                      title="Doors"
                      value={policy.riskObject.numberDoors.toString()}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DataPresenter
                      title="Version"
                      value={policy.riskObject.version}
                    />
                  </Grid>
                  <Grid item xs={4} sm={4}>
                    <DataPresenter
                      title="Parking"
                      value={PARKING_TYPE[policy.riskObject.parking]}
                    />
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <DataPresenter
                      title="Kms per year"
                      value={policy.riskObject.kmsYear.toLocaleString('es-ES')}
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
                      value={policy.riskSubject.name}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <DataPresenter
                      title="Document Number"
                      value={policy.riskSubject.documentNumber}
                    />
                  </Grid>
                  <Grid item xs={6} sm={4}>
                    <DataPresenter
                      title="Birth date"
                      value={new Date(
                        policy.riskSubject.birthDate
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

                  {policy.coverages.map((coverage) => (
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
                          {convertEurosToEthers(
                            coverage.monthlyPremium
                          ).toFixed(8)}{' '}
                          ETH
                        </Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
                <Grid container>
                  <Grid item xs={6} display={'flex'} alignItems={'flex-end'}>
                    <Typography variant="body2">Premium per month</Typography>
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
                <Divider />
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    alignItems="flex-end"
                    marginBottom={1}
                  >
                    <Box mr={1}>
                      <PaymentsIcon fontSize="small" />
                    </Box>
                    <Typography variant="body2" fontStyle={'oblique'}>
                      Payments
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <DataPresenter
                      title="Effective date"
                      value={startDate.toLocaleDateString('en-GB')}
                    />
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <DataPresenter
                      title="End date"
                      value={endDate.toLocaleDateString('en-GB')}
                    />
                  </Grid>
                  <Grid item xs={4} sm={2}>
                    <DataPresenter
                      title="Premium (€)"
                      value={`${totalPremium.toLocaleString('es-ES')}€`}
                    />
                  </Grid>
                  <Grid item xs={8} sm={4}>
                    <DataPresenter
                      title="Premium (Ethers)"
                      value={`${ethersPaid.substring(0, 10)} ETH`}
                      sx={{ fontWeight: 600 }}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Paper>
          </Fade>
        </Box>
        <Stack
          flexBasis={{ xs: '100%', sm: '20%' }}
          flexGrow={1}
          flexShrink={0}
          spacing={2}
        >
          <Button
            variant="contained"
            color="warning"
            disabled={isPolicyCancelled}
            onClick={() => toast.info('Claim feature is not implemented yet')}
          >
            Make a claim
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={isPolicyCancelled}
            onClick={() => setCancelModalOpen(true)}
          >
            Cancel policy
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={isPolicyCancelled}
            onClick={() => toast.info('Renewal feature is not implemented yet')}
          >
            Renew
          </Button>
        </Stack>
      </Box>
      <CancelModal
        onSuccessCancel={() => refetch()}
        startDate={startDate}
        endDate={endDate}
        premium={premium as unknown as BigNumberish}
        open={cancelModalOpen}
        handleClose={() => setCancelModalOpen(false)}
      />
    </PageLayout>
  );
};

export default PolicyView;
