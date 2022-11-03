require('dotenv').config();
// npx hardhat run scripts/mint/nft2.js --network mumbai

const main = async () => {
  const nftContract = await hre.ethers.getContractAt(
    'NFT2',
    process.env.NFT_CONTRACT2_MUMBAI
  );

  for (let i = 0; i < 3; i++) {
    let tx = await nftContract.mintFTR();
    await tx.wait();
  }

  console.log('3 tokens minted');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
