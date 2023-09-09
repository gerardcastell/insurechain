import { getCsrfToken, signIn, useSession } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { useCallback, useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
import { generateNonce } from '@insurechain/web/backend/data-access';

function Siwe() {
  const { signMessageAsync } = useSignMessage();
  const { chain } = useNetwork();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { data: session, status } = useSession();

  const handleLogin = useCallback(async () => {
    try {
      const callbackUrl = '/';
      const message = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: 'Sign in with Ethereum to the Insurechain.',
        uri: window.location.origin,
        version: '1',
        chainId: chain?.id,
        nonce: await generateNonce(),
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });
      signIn('credentials', {
        message: JSON.stringify(message),
        redirect: false,
        signature,
        callbackUrl,
      });
    } catch (error) {
      window.alert(error);
    }
  }, [address, chain, signMessageAsync]);

  useEffect(() => {
    console.log({ isConnected });
    if (isConnected && !session) {
      handleLogin();
    }
  }, [isConnected, session, handleLogin]);

  return (
    <Box>
      <Button
        onClick={(e) => {
          e.preventDefault();
          if (!isConnected) {
            connect();
          } else {
            handleLogin();
          }
        }}
      >
        Sign-in
      </Button>
      {isConnected && (
        <Button
          onClick={(e) => {
            e.preventDefault();
            disconnect();
          }}
        >
          Disconnect
        </Button>
      )}
    </Box>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default Siwe;
