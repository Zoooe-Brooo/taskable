import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FaUser, FaHistory, FaShoppingCart, FaCompass } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import '../Cart/style.css';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  let lastScrollY = window.scrollY;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setOpacity(Math.max(0.5, 1 - currentScrollY / 200));

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Box
      as="header"
      position="fixed"
      top="0"
      width="100%"
      bg="rgba(255, 255, 255, 0.1)"
      boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
      backdropFilter="blur(10px)"
      zIndex="1000"
      p={4}
      style={{
        backgroundColor: 'var(--primary)',
        opacity: isVisible ? opacity : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      <Flex justify="space-between" align="center">
        <Link to="/explore" style={{ textDecoration: 'none' }}>
          <Text
            as="h1"
            style={{ color: 'var(--dark)' }}
            fontSize="2xl"
            fontWeight="bold"
          >
            Taskable
          </Text>
        </Link>
        <Flex display={{ base: 'none', md: 'flex' }}>
          <Link to="/my-profile" className="icon-link" color="var(--dark)" mx={5}>
            <FaUser />
          </Link>
          <Link to="/explore" className="icon-link" color="var(--dark)" mx={5}>
            <FaCompass />
          </Link>
          <Link to="/checkout" className="icon-link" color="var(--dark)" mx={5}>
            <FaShoppingCart />
          </Link>
        </Flex>
        <Box display={{ base: 'flex', md: 'none' }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              variant="outline"
              aria-label="Options"
            />
            <MenuList>
              <MenuItem>
                <Link to="/my-profile" color="var(--dark)">
                  My Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/explore" color="var(--dark)">
                  Explore
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/checkout" color="var(--dark)">
                  Cart
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
}

export default Header;