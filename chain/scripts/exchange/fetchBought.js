require('dotenv').config();
// npx hardhat run scripts/exchange/fetchBought.js --network mumbai

const main = async () => {
  const market = await hre.ethers.getContractAt(
    'NftMarket2',
    process.env.NFT_MARKET_MUMBAI
  );

  const tx = await market.fetchUserNFTs(process.env.NFT_MARKET_MUMBAI);
  console.log(tx);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
