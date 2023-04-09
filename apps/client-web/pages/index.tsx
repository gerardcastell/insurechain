import styles from './index.module.css';
import LoginButton from '../components/login-btn';
import { useSession } from 'next-auth/react';
import { Button, Typography } from '@mui/material';
import {
  getProposals,
  signIn,
  signUp,
} from '@insurechain/web/backend/data-access';
import { useState, useEffect, useCallback } from 'react';

export function Index() {
  const { data: session } = useSession();
  const [user, setUser] = useState(null);
  const signInUser = useCallback(async () => {
    const _user = await signIn('gerard@gmail.com', '12345');
    // const _user = await getProposals();
    setUser(_user);
    console.log(_user);
  }, []);

  return (
    <>
      <Typography>
        {session ? `Hello ${session.user.email}` : 'Hello World'}
      </Typography>
      <Button onClick={() => signInUser()}>Update user</Button>
      <LoginButton />
    </>
  );
}

export default Index;
