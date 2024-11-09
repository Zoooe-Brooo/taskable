import { Box, Flex, Image, Text, Button, VStack, HStack } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../utils/redux/freelancersSlice';
import { idbPromise } from '../utils/helpers';

const Checkout = () => {
  const cart = useSelector(state => state.freelancers.cart);
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cart.reduce((sum, service) => sum + service.price * service.purchaseQuantity, 0).toFixed(2);
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
    idbPromise('cart', 'delete', item);
  };

  return (
    <Box p={5} bgGradient="linear(to-r, teal.500, green.500)" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Text fontSize="3xl" fontWeight="bold" color="white" textAlign="center">
          Checkout
        </Text>
        {cart.map((service) => (
          <Flex
            key={service._id}
            bg="rgba(255, 255, 255, 0.2)"
            p={4}
            borderRadius="md"
            boxShadow="lg"
            align="center"
            direction={{ base: 'column', md: 'row' }}
            backdropFilter="blur(10px)"
            border="1px solid rgba(255, 255, 255, 0.3)"
          >
            <Image 
              src={`/images/profile-pics/${service.name.split(' ')[0].toLowerCase()}.png`} 
              alt={service.name} 
              boxSize="100px" 
              mr={4} 
              mb={{ base: 4, md: 0 }} 
            />
            <Box flex="1" textAlign={{ base: 'center', md: 'left' }}>
              <Text fontSize="lg" fontWeight="bold" color="gray.800">{service.name}</Text>
              <Text color="gray.700">Price per Hour: ${service.price}</Text>
              <Text color="gray.700">Quantity: {service.purchaseQuantity}</Text>
            </Box>
            <Button 
              colorScheme="red" 
              mt={{ base: 4, md: 0 }}
              onClick={() => handleRemoveItem(service)}
            >
              Remove
            </Button>
          </Flex>
        ))}
        <HStack justify="space-between" p={4} bg="rgba(255, 255, 255, 0.2)" borderRadius="md" boxShadow="lg">
          <Text fontSize="lg" fontWeight="bold" color="gray.800">
            Total: ${calculateTotal()}
          </Text>
          <Button 
            colorScheme="teal"
            onClick={() => {/* Stripe integration will go here */}}
          >
            Proceed to Payment
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default Checkout;