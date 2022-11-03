require('dotenv').config();
// npx hardhat run scripts/mint/nft-uri.js --network mumbai

const main = async () => {
  const nftContract = await hre.ethers.getContractAt(
    'NFT_TokenURI',
    process.env.NFT_URI_MUMBAI
  );

  console.log(process.env.TOKEN_URI);

  let tx = await nftContract.mintToken(`${process.env.TOKEN_URI}`);
  await tx.wait();
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
