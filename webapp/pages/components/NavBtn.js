import Link from 'next/link';
import { Text } from '@chakra-ui/react';

const NavBtn = ({ name, currRoute }) => {
  const route = name.toLowerCase();
  const highlight = route == currRoute;
  return (
    <Link href={`/${route}`}>
      <Text
        style={{ cursor: 'pointer' }}
        px="2"
        fontSize="22"
        fontWeight="bold"
        color={highlight ? 'lime' : ''}
      >
        {name ? name : 'Home'}
      </Text>
    </Link>
  );
};

export default NavBtn;
