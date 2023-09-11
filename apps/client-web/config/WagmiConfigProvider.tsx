import React, { PropsWithChildren } from 'react';
import { WagmiConfig, configureChains, sepolia, createConfig } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';
import { hardhat } from 'wagmi/chains';

export const { chains, publicClient } = configureChains(
  [sepolia, hardhat],
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient,
  connectors: [new InjectedConnector({ chains })],
});

const WagmiConfigProvider = ({ children }: PropsWithChildren) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export default WagmiConfigProvider;
