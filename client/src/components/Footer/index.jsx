import { Box } from '@chakra-ui/react';

function Footer() {
  return (
    <Box
      as="footer"
      width="100%"
      bg="gray.800"
      color="white"
      textAlign="center"
      p={4}
      mt="auto"
    >
      <p>© 2024 Taskable. All rights reserved.</p>
    </Box>
  );
}

export default Footer; 