import { VStack } from '@chakra-ui/layout';
import { useColorMode } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import Navbar from './components/Navbar';
import Meta from './components/Meta';

const Home = () => {
  // const provider = useProvider();
  const account = useAccount();
  const { toggleColorMode, colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <VStack height="100vh">
      <Meta />
      <Navbar account={account} darkMode={isDark} toggle={toggleColorMode} />
    </VStack>
  );
};

export default Home;
