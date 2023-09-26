import { usePolicyContract } from '@insurechain/web/blockchain';
import { Slider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
type Props = {
  address: `0x${string}`;
};
export const PolicyPreview = ({ address }: Props) => {
  const { ownerAddress, isError, isFetching } = usePolicyContract(address);
  if (isError) {
    return <Typography color="red">Error fetching owner address</Typography>;
  }
  if (isFetching) {
    <Slider />;

    console.log(ownerAddress);
  }
  return (
    <Box>
      <Typography>Owner Address: {ownerAddress.toString()}</Typography>
    </Box>
  );
};
