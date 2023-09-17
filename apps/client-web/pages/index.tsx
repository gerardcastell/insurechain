import { useSiweAuth } from '@insurechain/web/blockchain';
import { Grid, Typography } from '@mui/material';
export function Index() {
  const { isAuthConnected, isAuthenticated, isConnected } = useSiweAuth();
  console.log({ isAuthConnected, isAuthenticated, isConnected });
  return (
    <Grid container spacing={4} justifyContent={'center'}>
      <Grid item>
        <Typography variant="h4">
          Secure, Transparent, Smart: Your Insurance, Our Blockchain
        </Typography>
        <Typography variant="h6">
          Building trust, one block at a time
        </Typography>
      </Grid>
    </Grid>
  );
}

export default Index;
