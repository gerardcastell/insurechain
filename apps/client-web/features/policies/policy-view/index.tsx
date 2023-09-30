import { usePolicyContract } from '@insurechain/web/blockchain';
import { BackLink } from '@insurechain/web/ui-elements';
import {
  Container,
  Stack,
  Paper,
  Box,
  Slide,
  Typography,
  Slider,
} from '@mui/material';
import React from 'react';

type Props = {
  address: `0x${string}`;
};
const PolicyView = ({ address }: Props) => {
  const { data, isError, isFetching } = usePolicyContract(address);
  if (isError || !data) {
    return <Typography color="red">Error fetching owner address</Typography>;
  }
  if (isFetching) {
    return <Slider />;
  }
  return (
    <Container maxWidth="md" sx={{ marginY: 4 }}>
      <BackLink text="Back to policies" link="/dashboard/policies" />
      <Slide direction="up" in={true}>
        <Stack spacing={4} sx={{ marginY: 4 }}>
          <Paper component={Box} padding={2}>
            <Typography>Address: {address}</Typography>
          </Paper>
        </Stack>
      </Slide>
    </Container>
  );
};

export default PolicyView;
