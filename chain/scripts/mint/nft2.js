require('dotenv').config();
// npx hardhat run scripts/mint/nft2.js --network goerli

const main = async () => {
  const nftContract = await hre.ethers.getContractAt(
    'NFT2',
    process.env.NFT_CONTRACT2
  );

  let tx = await nftContract.mintFTR();
  await tx.wait();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
