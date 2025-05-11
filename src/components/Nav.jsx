import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Text } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <Button variant="ghost">
          <Icon as={FaHome} />
          <Text ml={2}>Home</Text>
        </Button>
      </Link>
      <Link to="/wishlist">
        <Button variant="ghost">
          <Icon as={FaHeart} />
          <Text ml={2}>Wishlist</Text>
        </Button>
      </Link>
      <Link to="/about">
        <Button variant="ghost">
          <Icon as={FaInfoCircle} />
          <Text ml={2}>About</Text>
        </Button>
      </Link>
    </nav>
  );
};

export default Nav;