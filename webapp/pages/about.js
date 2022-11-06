import { Flex } from '@chakra-ui/layout';
import NavMini from './components/NavMini';

const about = () => {
  return (
    <Flex>
      <NavMini currRoute="about" />
    </Flex>
  );
};

export default about;
