import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Text } from '@chakra-ui/react';
import { FiHome, FiHeart, FiInfo } from 'react-icons/fi';

const Nav = () => {
  return (
    <nav className="flex justify-center items-center space-x-6 py-4">
      <Link to="/">
        <Button 
          variant="ghost" 
          className="rounded-full hover:bg-blue-100 transition-all duration-300"
        >
          <Icon as={FiHome} className="text-gray-600 hover:text-blue-500" boxSize={5} />
          <Text ml={2}>Home</Text>
        </Button>
      </Link>
      <Link to="/wishlist">
        <Button 
          variant="ghost" 
          className="rounded-full hover:bg-red-100 transition-all duration-300"
        >
          <Icon as={FiHeart} className="text-gray-600 hover:text-red-500" boxSize={5} />
          <Text ml={2}>Wishlist</Text>
        </Button>
      </Link>
      <Link to="/about">
        <Button 
          variant="ghost" 
          className="rounded-full hover:bg-green-100 transition-all duration-300"
        >
          <Icon as={FiInfo} className="text-gray-600 hover:text-green-500" boxSize={5} />
          <Text ml={2}>About</Text>
        </Button>
      </Link>
    </nav>
  );
};

export default Nav;