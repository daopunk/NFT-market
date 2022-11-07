import { VStack } from '@chakra-ui/layout';
import NavMini from './components/NavMini';

const explore = () => {
  return (
    <VStack h="100vh">
      <NavMini currRoute="explore" />
    </VStack>
  );
};

export default explore;
