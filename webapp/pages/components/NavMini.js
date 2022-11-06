import Link from 'next/link';
import { HStack, Flex, Heading, Spacer, Box } from '@chakra-ui/layout';
import { Icon } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { SiStarship } from 'react-icons/si';
import NavBtn from './NavBtn';

const NavMini = ({ currRoute }) => {
  const routes = ['Mint', 'Explore', 'About'];

  return (
    <Flex p="2" width="100%">
      <HStack>
        <Link href="/">
          <Icon as={SiStarship} w="8" h="8" style={{ cursor: 'pointer' }} />
        </Link>
        <Link href="/">
          <Heading
            alignSelf="flex-start"
            fontSize="28"
            style={{ cursor: 'pointer' }}
          >
            OpenSky
          </Heading>
        </Link>
      </HStack>
      <Spacer />
      <HStack>
        {routes.map((route) => (
          <NavBtn name={route} currRoute={currRoute} />
        ))}
      </HStack>
      <Spacer />
      <Box>
        <HStack>
          <ConnectButton chainStatus="icon" showBalance={false} />
        </HStack>
      </Box>
    </Flex>
  );
};

export default NavMini;
