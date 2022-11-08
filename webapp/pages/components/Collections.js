import { HStack, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Text, Grid, GridItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Market from '../chain/abi/Market.json';

const Collections = () => {
  const marketAddress = '0x893D31330e523fAc96A2E67577De002044722202';
  const nftAddress = '0xC38e6043eC348709Bc4c62e5e67863c9254Cd62a';

  const [userNfts, setUserNfts] = useState([]);
  const [onSaleNfts, setOnSaleNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContract = (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(address, Market.abi, signer);
  };

  const getUserCollection = async () => {
    const market = getContract(marketAddress);
    try {
      let tx = await market.fetchUserNFTsByCollection(nftAddress);
      setUserNfts(tx);
      console.log(userNfts);
    } catch (error) {
      console.log(`Collection Load Error: ${error}`);
    }
  };

  const getOnSaleCollection = async () => {
    const market = getContract(marketAddress);
    try {
      let tx = await market.fetchOnSaleNFTsByCollection(nftAddress);
      setOnSaleNfts(tx);
    } catch (error) {
      console.log(`Collection Load Error: ${error}`);
    }
  };

  const buyOnSaleNft = async (id, price) => {
    const market = getContract(marketAddress);
    try {
      setLoading(true);
      let tx = await market.buyOnSaleNFT(nftAddress, id, {
        value: ethers.utils.parseEther(price),
      });
      await tx.wait();
      console.log(tx);
      setLoading(false);
      getUserCollection();
      getOnSaleCollection();
    } catch (error) {
      console.log(`Collection Load Error: ${error}`);
    }
  };

  const handleBuy = (id, price) => {
    buyOnSaleNft(parseInt(id.slice(2), 10), price);
  };

  useEffect(() => {
    getUserCollection();
    getOnSaleCollection();
  }, []);

  return (
    <VStack>
      <HStack>
        <Button onClick={getOnSaleCollection}>View On-Sale NFTs</Button>
        <Button onClick={getUserCollection}>Your Purchased NFTs</Button>
      </HStack>
      <Text fontWeight="bold">Your Purchased NFTs:</Text>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {userNfts.map((item) => (
          <GridItem w="100%" h="100%" border="1px" p="2">
            <Text>{item.id._hex}</Text>
            <Text>{item.owner.slice(0, 10)}</Text>
            <Text>{ethers.utils.formatEther(item.price._hex)}</Text>
          </GridItem>
        ))}
      </Grid>
      <Text fontWeight="bold">On-Sale NFTs:</Text>
      {loading && <Text>Your Transaction is Being Processed</Text>}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {onSaleNfts.map((item) => (
          <GridItem w="100%" h="100%" border="1px" p="2">
            <Text>{item.id._hex}</Text>
            <Text>{item.vender.slice(0, 10)}</Text>
            <Text>{ethers.utils.formatEther(item.price._hex)}</Text>
            <Button
              onClick={() =>
                handleBuy(
                  item.id._hex,
                  ethers.utils.formatEther(item.price._hex)
                )
              }
            >
              Buy
            </Button>
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};

export default Collections;
