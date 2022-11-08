import { Center, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Input, Text, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import NavMini from './components/NavMini';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NFT from './chain/abi/NFT_SVG.json';
import Market from './chain/abi/Market.json';

const sell = () => {
  const marketAddress = '0x893D31330e523fAc96A2E67577De002044722202';
  const [nftAddress, setNftAddress] = useState('');
  const [tokenId, setTokenId] = useState(0);
  const [loading, setLoading] = useState(false);

  const unlock = nftAddress.length == 40 && tokenId.length > 0;

  const getContract = (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, Market.abi, signer);
  };

  const sellNft = async () => {
    const market = getContract(marketAddress);
    try {
      setLoading(true);
      let tx = await market.createOnSaleNFT(
        nftAddress,
        tokenId,
        ethers.utils.parseEther('0.05')
      );
      await tx.wait();
      setNftAddress('');
      setTokenId(0);
      setLoading(false);
      console.log('Sale created');
    } catch (error) {}
  };

  const handleContract = (e) => {
    setNftAddress(e.target.value);
  };

  const handleId = (e) => {
    setTokenId(e.target.value);
  };

  return (
    <VStack h="100vh">
      <NavMini currRoute="sell" />
      <Center>
        {loading ? (
          <Text>Transaction Processing...</Text>
        ) : (
          <VStack mt="20vh">
            <Text fontSize="20">NFT Contract Address:</Text>
            <InputGroup>
              <InputLeftAddon>0x</InputLeftAddon>
              <Input
                type="text"
                placeholder="1234..."
                onChange={handleContract}
                value={nftAddress}
              />
            </InputGroup>
            <Text fontSize="20">NFT Token Id:</Text>
            <InputGroup>
              <InputLeftAddon>0x</InputLeftAddon>
              <Input
                type="text"
                placeholder="1"
                onChange={handleId}
                value={tokenId == 0 ? '' : tokenId}
              />
            </InputGroup>
            <Button
              _hover={{ bg: 'lime' }}
              onClick={sellNft}
              disabled={!unlock}
            >
              Sell
            </Button>
          </VStack>
        )}
      </Center>
    </VStack>
  );
};

export default sell;
