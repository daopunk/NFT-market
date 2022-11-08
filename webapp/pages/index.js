import { VStack } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import Navbar from './components/Navbar';
import Meta from './components/Meta';
import Collections from './components/Collections';

const Home = () => {
  const account = useAccount();
  const { toggleColorMode, colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <VStack h="100vh">
      <Meta />
      <Navbar account={account} darkMode={isDark} toggle={toggleColorMode} />
      <Collections />
    </VStack>
  );
};

export default Home;
