import { Flex } from '@chakra-ui/layout';
import NavMini from './components/NavMini';

const mint = () => {
  return (
    <Flex>
      <NavMini currRoute="mint" />
    </Flex>
  );
};

export default mint;
