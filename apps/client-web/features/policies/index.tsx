import {
  usePolicyContract,
  useReadPolicies,
} from '@insurechain/web/blockchain';
import { Slider, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';
import { PolicyPreview } from './PolicyPreview';

const Policies = () => {
  const {
    policiesAddresses,
    isError,
    isFetching,
  }: {
    policiesAddresses: `0x${string}`[];
    isError: boolean;
    isFetching: boolean;
  } = useReadPolicies() as unknown as {
    policiesAddresses: `0x${string}`[];
    isError: boolean;
    isFetching: boolean;
  };

  console.log(policiesAddresses);
  if (isError || policiesAddresses) {
    <Typography color="red">
      Error ocurred while fetching user policies
    </Typography>;
  }

  if (isFetching || !policiesAddresses) {
    <Slider />;
  }
  return (
    <Container maxWidth={'md'}>
      {policiesAddresses?.map((address) => (
        <PolicyPreview key={address} address={address} />
      ))}
    </Container>
  );
};

export default Policies;
