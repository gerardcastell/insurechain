import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  etherscan: {
    apiKey: 'QZGWMJ6GWYH9Y8FCMRAZDI9K9EKB1GK64A',
  },
};

export default config;
