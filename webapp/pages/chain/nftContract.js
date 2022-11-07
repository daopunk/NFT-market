// import { ethers } from 'ethers';
// import NFT from './abi/NFT_SVG.json';
// import { useProvider } from 'wagmi';

// const getContract = (address) => {
//   const provider = useProvider();
//   const signer = provider.getSigner();
//   return new ethers.Contract(address, NFT.abi, signer);
// };

// const mintNft = async (address) => {
//   const nftContract = getContract(address);
//   console.log('Minting NFT');
//   let tx = await nftContract.mintFTR();
//   await tx.wait();
//   console.log(`Transaction Hash: ${tx.hash}`);
// };

// export { getContract, mintNft };
