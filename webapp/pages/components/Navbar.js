import Link from 'next/link';
import { HStack, Flex, Heading, Spacer, Box } from '@chakra-ui/layout';
import { IconButton, Icon } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { FaSun, FaMoon, FaBolt } from 'react-icons/fa';
import { SiStarship } from 'react-icons/si';
import NavBtn from './NavBtn';

const Navbar = ({ account, darkMode, toggle }) => {
  const bgcolor = darkMode ? 'gray.900' : 'gray.300';
  const routes = ['Mint', 'Explore', 'About'];

  return (
    <Flex p="2" width="100%" bgColor={bgcolor}>
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
          <NavBtn name={route} key={route} />
        ))}
      </HStack>
      <Spacer />
      <Box>
        <HStack>
          <Flex>{account.isConnected && <FaBolt />}</Flex>
          <ConnectButton chainStatus="icon" showBalance={false} />
          <IconButton
            ml={8}
            icon={darkMode ? <FaSun /> : <FaMoon />}
            isRound="true"
            onClick={toggle}
          />
        </HStack>
      </Box>
    </Flex>
  );
};

export default Navbar;
