/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateNonce } from '@insurechain/web/backend/data-access';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { SiweMessage } from 'siwe';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
} from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

export const useSiweAuth = () => {
  const { signMessageAsync } = useSignMessage({
    onSuccess: () => {
      toast.success('Successfully logged in');
    },
  });
  const { isConnected, address, connector } = useAccount();
  const { chain } = useNetwork();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess: (data) => {
      signMessage(data);
    },
    onError: (error) => onError(error),
  });
  const { disconnect } = useDisconnect({
    onMutate: () => {
      signOut();
    },
  });
  const { status } = useSession();

  const onError = useCallback(
    (error: any) => {
      console.error(error);
      toast.error(error.shortMessage || 'Something went wrong');
      disconnect();
    },
    [disconnect]
  );

  const signMessage = useCallback(
    async (data: any) => {
      try {
        const callbackUrl = '/';
        const message = new SiweMessage({
          domain: window.location.host,
          address: data.account,
          statement: 'Sign in with Ethereum to Insurechain.',
          uri: window.location.origin,
          version: '1',
          chainId: data.chain?.id,
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
      } catch (error: any) {
        onError(error);
      }
    },
    [signMessageAsync, onError]
  );

  const logout = useCallback(() => {
    signOut();
    disconnect();
  }, [disconnect]);

  return {
    loginWithSiwe: connect,
    logout,
    isAuthenticated: isConnected && status === 'authenticated',
    connectorName: connector?.name,
    chainName: chain?.name,
    address,
  };
};
