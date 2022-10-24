require('dotenv').config();
// npx hardhat run scripts/deploy/nft1.js --network goerli

async function main() {
  const nftMarket = await ethers.getContractAt(
    'NftMarket',
    process.env.NFT_MARKET
  );

  const nftContractFactory = await ethers.getContractFactory('NFT1');
  const nftContract = await nftContractFactory.deployed(
    nftMarket.address,
    'CipherPunx',
    'CPX'
  );
  await nftContract.deployed();
  console.log(`\nNFT1 Contract deployed: ${nftContract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
