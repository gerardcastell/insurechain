import { usePolicyContract } from '@insurechain/web/blockchain';
import { Slider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
type Props = {
  address: `0x${string}`;
};
export const PolicyPreview = ({ address }: Props) => {
  const { data, isError, isFetching } = usePolicyContract(address);
  if (isError || !data) {
    return <Typography color="red">Error fetching owner address</Typography>;
  }
  if (isFetching) {
    return <Slider />;
  }

  const [{ result: owner }, { result: endTime }, { result: policyData }] = data;
  const policy = JSON.parse(policyData as any);
  console.log({ policy });
  const datetime: number = 1000 * Number(endTime);
  const date = new Date(datetime);
  return (
    <Box>
      <Typography>Owner Address: {owner}</Typography>
      <Typography>End time: {date.toLocaleDateString('en-GB')}</Typography>
    </Box>
  );
};
