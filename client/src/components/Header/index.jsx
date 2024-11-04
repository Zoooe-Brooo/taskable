import { useState, useEffect } from 'react';
import { Box, Flex, Link } from '@chakra-ui/react';

function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    let lastScrollY = window.scrollY;

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
        opacity: opacity,
        transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      <Flex justify="space-between" align="center">
        <h1 style={{ color: 'var(--dark)' }}>Taskable</h1>
        <Flex>
          <Link href="#" color="var(--dark)" mx={2}>
            My Profile
          </Link>
          <Link href="#" color="var(--dark)" mx={2}>
            Previous Orders
          </Link>
          <Link href="#" color="var(--dark)" mx={2}>
            Cart
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header; 