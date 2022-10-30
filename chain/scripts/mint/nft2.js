require('dotenv').config();
// npx hardhat run scripts/mint/nft2.js --network mumbai

const main = async () => {
  const nftContract = await hre.ethers.getContractAt(
    'NFT2',
    process.env.NFT_CONTRACT2_MUMBAI
  );

  let tx = await nftContract.mintFTR();
  await tx.wait();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
