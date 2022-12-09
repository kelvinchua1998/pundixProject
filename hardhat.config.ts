import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
require("dotenv").config();

declare var process: {
  env: {
    METAMASK_PRIVATE_KEY: string;
    ETHERSCAN_API_KEY: string;
    ALCHEMY_API_URL: string;
    ALCHEMY_API_KEY: string;
  };
};

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `${process.env.ALCHEMY_API_URL}`,
      accounts: [process.env.METAMASK_PRIVATE_KEY],
      gasPrice: 90000000000,
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
