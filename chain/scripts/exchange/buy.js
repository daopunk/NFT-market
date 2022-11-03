const { ethers } = require('ethers');
require('dotenv').config();
// npx hardhat run scripts/exchange/buy.js --network mumbai

const main = async () => {
  const market = await hre.ethers.getContractAt(
    'NftMarket2',
    process.env.NFT_MARKET_MUMBAI
  );

  const tokenId = 0;

  let tx = await market.buyOnSaleNFT(
    process.env.NFT_CONTRACT2_MUMBAI,
    tokenId,
    { value: ethers.utils.parseEther('0.05') }
  );
  await tx.wait();

  console.log('buy complete');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
