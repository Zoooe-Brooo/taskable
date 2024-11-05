import { Box, Flex, Image, Text, Button, VStack, HStack } from '@chakra-ui/react';

const Checkout = () => {
  // Sample static data for demonstration
  const services = [
    {
      id: 1,
      name: 'Web Development Consultation',
      price: 100,
      hours: 2,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Graphic Design Session',
      price: 75,
      hours: 1,
      image: 'https://via.placeholder.com/150',
    },
  ];

  // Calculate total price
  const calculateTotal = () => {
    return services.reduce((sum, service) => sum + service.price * service.hours, 0).toFixed(2);
  };

  return (
    <Box p={5} bgGradient="linear(to-r, teal.500, green.500)" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Text fontSize="3xl" fontWeight="bold" color="white" textAlign="center">
          Checkout
        </Text>
        {services.map((service) => (
          <Flex
            key={service.id}
            bg="rgba(255, 255, 255, 0.2)"
            p={4}
            borderRadius="md"
            boxShadow="lg"
            align="center"
            direction={{ base: 'column', md: 'row' }}
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.3)"
          >
            <Image src={service.image} alt={service.name} boxSize="100px" mr={4} mb={{ base: 4, md: 0 }} />
            <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
              <Text fontSize="lg" fontWeight="bold" color="gray.800">{service.name}</Text>
              <Text color="gray.700">Price per Hour: ${service.price}</Text>
              <Text color="gray.700">Hours: {service.hours}</Text>
            </Box>
            <Button colorScheme="red" mt={{ base: 4, md: 0 }}>Remove</Button>
          </Flex>
        ))}
        <HStack justify="space-between" p={4} bg="rgba(255, 255, 255, 0.2)" borderRadius="md" boxShadow="lg" backdropFilter="blur(10px)" border="1px solid rgba(255, 255, 255, 0.3)">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">Total: ${calculateTotal()}</Text>
          <Button colorScheme="teal">Proceed to Payment</Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Checkout;