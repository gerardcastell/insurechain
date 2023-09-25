import {
  usePolicyContract,
  useReadPolicies,
} from '@insurechain/web/blockchain';
import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import React from 'react';

const Policies = () => {
  const { getPolicies } = useReadPolicies();
  const policyAddress = getPolicies ? getPolicies[0] : null;

  const { ownerAddress } = usePolicyContract(policyAddress);
  return (
    <Container maxWidth={'md'}>
      <Typography>
        Policy {policyAddress} at {ownerAddress}
      </Typography>
    </Container>
  );
};

export default Policies;
