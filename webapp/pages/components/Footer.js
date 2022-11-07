import { Icon, Flex, Text, HStack } from '@chakra-ui/react';
import { SiStarship } from 'react-icons/si';

const Footer = () => {
  return (
    <Flex pt="10" pb="5">
      <HStack mx="auto">
        <Icon as={SiStarship} w="8" h="8" style={{ cursor: 'pointer' }} />
        <Text>Trash dApps &copy; 2022</Text>
      </HStack>
    </Flex>
  );
};

export default Footer;
