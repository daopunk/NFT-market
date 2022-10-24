// npx hardhat run scripts/deploy/market.js --network goerli

async function main() {
  const NftMarketContract = await ethers.getContractFactory('NftMarket');
  const nftMarket = await NftMarketContract.deploy();
  await nftMarket.deployed();
  console.log(`\nMarket Contract deployed: ${nftMarket.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
