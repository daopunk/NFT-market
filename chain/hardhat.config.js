require('@nomicfoundation/hardhat-toolbox');
require('@nomiclabs/hardhat-etherscan');
require('dotenv').config();
// npx hardhat verify --network mumbai ADDRESS

module.exports = {
  solidity: '0.8.9',
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI,
      accounts: [process.env.PRI_KEY],
    },
    goerli: {
      url: process.env.INFURA_GOERLI,
      accounts: [process.env.PRI_KEY],
    },
  },
  etherscan: {
    apiKey: {
      goerli: process.env.ETHER_KEY,
      polygonMumbai: process.env.POLY_KEY,
    },
  },
};

// verifying with constructor args requires seperate module export of specified export values
