require('dotenv').config();
// npx hardhat run scripts/exchange/fetchForSale.js --network mumbai

const main = async () => {
  const market = await hre.ethers.getContractAt(
    'NftMarket',
    process.env.NFT_MARKET_MUMBAI
  );

  let tx = await market.fetchOnSaleNFTsByCollection(process.env.NFT_SVG_MUMBAI);

  console.log(tx);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
