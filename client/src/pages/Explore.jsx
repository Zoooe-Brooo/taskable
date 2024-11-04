import { Box, Flex, Image, Text } from '@chakra-ui/react';

const users = [
  {
    name: 'User 1',
    description: 'Description for User 1',
    price: '$100',
    image: 'https://via.placeholder.com/150',
  },
  {
    name: 'User 2',
    description: 'Description for User 2',
    price: '$150',
    image: 'https://via.placeholder.com/150',
  },
  // Add more users as needed
];

const Explore = () => {
  return (
    <Flex wrap="wrap" justify="center" p={4}>
      {users.map((user, index) => (
        <Box
          key={index}
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(10px)"
          borderRadius="15px"
          m={4}
          p={4}
          width="300px"
          textAlign="center"
        >
          <Image
            src={user.image}
            alt={user.name}
            borderRadius="full"
            boxSize="150px"
            mb={4}
          />
          <Text fontSize="xl" fontWeight="bold">
            {user.name}
          </Text>
          <Text>{user.description}</Text>
          <Text fontWeight="bold" mt={2}>
            {user.price}
          </Text>
        </Box>
      ))}
    </Flex>
  );
};

export default Explore;
