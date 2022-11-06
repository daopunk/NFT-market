import { Flex } from '@chakra-ui/layout';
import NavMini from './components/NavMini';

const explore = () => {
  return (
    <Flex>
      <NavMini currRoute="explore" />
    </Flex>
  );
};

export default explore;
