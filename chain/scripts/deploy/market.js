// npx hardhat run scripts/deploy/market.js --network mumbai

async function main() {
  const NftMarketContract = await ethers.getContractFactory('NftMarket2');
  const nftMarket = await NftMarketContract.deploy();
  await nftMarket.deployed();
  console.log(`\nMarket Contract deployed: ${nftMarket.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
