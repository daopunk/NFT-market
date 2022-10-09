const hre = require('hardhat');

/**
 * @dev npx hardhat run scripts/deploy.js --network mumbai
 */

async function main() {
  const NftMarketContract = await ethers.getContractFactory('NftMarket');
  this.nftMarket = await NftMarketContract.deploy();
  await this.nftMarket.deployed();

  const NftContract = await ethers.getContractFactory('NFT');
  this.nft = await NftContract.deploy(
    this.nftMarket.address,
    'CipherPunx',
    'CPX'
  );
  await this.nft.deployed();

  console.log(
    `Contracts deployed at:\nMarket: ${this.nftMarket.address}\nNFT: ${this.nft.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Contracts deployed at:
 * Market: 0xD9E1d3630B7f468C115C98A4a1EcAcb5A356bD45
 * NFT: 0x1bE5A5C0Eb36A5dC7f60489ceE89F62CCc0be77B
 */
