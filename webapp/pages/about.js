import { Box, VStack, Text, Image } from '@chakra-ui/react';
import NavMini from './components/NavMini';

const about = () => {
  return (
    <VStack>
      <NavMini currRoute="about" />
      <Box width="100%" px="12vw">
        <Image
          src="https://www.myrelatedlife.com/app/uploads/2022/01/NFT-1-copy-1196x445-1300x445-c-default-1300x445-c-default.jpg"
          alt="NFT Banner"
        />

        <Text mt="5vh" fontSize="20">
          OpenSky is an NFT Market where you can buy, sell, and mint NFTs. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in
          voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </Text>
        <Text mt="5vh" fontSize="20">
          Navigation: Mint tab allows you to mint a special NFT from the OpenSky
          collection. Explore allows you to view NFTs that are on sale. Home
          allows you to see special content.
        </Text>
        <Text my="5vh" fontSize="20">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
          dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed
          quia non numquam eius modi tempora incidunt ut labore et dolore magnam
          aliquam quaerat voluptatem.
        </Text>
      </Box>
    </VStack>
  );
};

export default about;
