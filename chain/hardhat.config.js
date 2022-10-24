require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

module.exports = {
  solidity: '0.8.9',
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI,
      accounts: [process.env.PRI_KEY],
    },
    goerli: {
      url: process.env.ALCHEMY_GOERLI,
      accounts: [process.env.PRI_KEY],
    },
  },
};
