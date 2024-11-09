import { Box, Text, Button, VStack } from '@chakra-ui/react';
import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
    >
      <VStack spacing={6} p={8} bg="white" borderRadius="lg" boxShadow="lg">
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          Oops! Something went wrong
        </Text>
        <Text color="gray.600">
          {error?.message || 'An unexpected error occurred'}
        </Text>
        <Button
          colorScheme="teal"
          onClick={() => navigate('/')}
        >
          Return to Home
        </Button>
      </VStack>
    </Box>
  );
};

export default ErrorBoundary;
