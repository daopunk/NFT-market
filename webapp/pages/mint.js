import { Center, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Input, Text, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import NavMini from './components/NavMini';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NFT from './chain/abi/NFT_SVG.json';

const mint = () => {
  const [address, setAddress] = useState('');
  const unlock = address.length == 40;

  const getContract = (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, NFT.abi, signer);
  };

  const mintNft = async () => {
    const nftContract = getContract(address);
    const url = `https://testnets.opensea.io/assets/mumbai/${address}`;

    try {
      nftContract.on('NftMinted', (from, tokenId) => {
        console.log(from, tokenId.toNumber());
        alert(`Minted NFT available at: ${url}/${tokenId.toNumber()}`);
      });
      console.log('Listening for Mint');

      let tx = await nftContract.mintFTR();
      await tx.wait();
      console.log(`Transaction Hash: ${tx.hash}`);
    } catch (error) {
      console.log(`NFT Mint Event Error: ${error}`);
    }
  };

  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {});

  return (
    <VStack h="100vh">
      <NavMini currRoute="mint" />
      <Center>
        <VStack mt="20vh">
          <Text fontSize="20">NFT Contract Address:</Text>
          <InputGroup>
            <InputLeftAddon>0x</InputLeftAddon>
            <Input type="text" placeholder="1234..." onChange={handleChange} />
          </InputGroup>
          <Button _hover={{ bg: 'lime' }} onClick={mintNft} disabled={!unlock}>
            Mint
          </Button>
        </VStack>
      </Center>
    </VStack>
  );
};

export default mint;
