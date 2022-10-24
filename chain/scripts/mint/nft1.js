require('dotenv').config();
// npx hardhat run scripts/mint/nft1.js --network goerli

const main = async () => {
  const nftContract = await hre.ethers.getContractAt(
    'NFT1',
    process.env.NFT_CONTRACT1
  );

  let tx = await nftContract.mintToken(process.env.TOKEN_URI);
  await tx.wait();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
