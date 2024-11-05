import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';

const freelancers = [
  {
    name: 'Amy Smith',
    service: 'Full Stack Developer',
    description: 'A versatile developer skilled in both front-end and back-end technologies, capable of building and maintaining complex web applications.',
    image: 'https://via.placeholder.com/150/grey',
    price: 60,
  },
  {
    name: 'John Doe',
    service: 'Front-End Developer',
    description: 'A front-end developer specializing in building and maintaining responsive websites and web applications.',
    image: 'https://via.placeholder.com/150/grey',
    price: 40,
  },
  {
    name: 'Brianna Johnson',
    service: 'Back-End Developer',
    description: 'A back-end developer specializing in building and maintaining server-side logic and databases for web applications.',
    image: 'https://via.placeholder.com/150/grey',
    price: 50,
  },
  {
    name: 'Mike Williams',
    service: 'UI/UX Designer',
    description: 'A UI/UX designer specializing in creating user-friendly interfaces and experiences for web and mobile applications.',
    image: 'https://via.placeholder.com/150/grey',
    price: 45,
  },
  {
    name: 'Jessica Brown',
    service: 'Baby Sitter',
    description: 'A responsible and caring baby sitter with experience caring for children of all ages.',
    image: 'https://via.placeholder.com/150/grey',
    price: 35,
  },
  {
    name: 'David Wilson',
    service: 'Gardener',
    description: 'A skilled gardener with experience maintaining lawns, gardens, and landscapes.',
    image: 'https://via.placeholder.com/150/grey',
    price: 45,
  },
  {
    name: 'Sarah Martinez',
    service: 'House Cleaner',
    description: 'A thorough and detail-oriented house cleaner with experience cleaning homes, apartments, and offices.',
    image: 'https://via.placeholder.com/150/grey',
    price: 30,
  },
  {
    name: 'Daniel Thompson',
    service: 'Dog Walker',
    description: 'A reliable and trustworthy dog walker with experience walking dogs of all breeds and sizes.',
    image: 'https://via.placeholder.com/150/grey',
    price: 20,
  },
  {
    name: 'Olivia Garcia',
    service: 'Tutor',
    description: 'An experienced tutor with expertise in a variety of subjects, capable of helping students of all ages.',
    image: 'https://via.placeholder.com/150/grey',
    price: 40,
  },
  {
    name: 'William Lee',
    service: 'Personal Trainer',
    description: 'A certified personal trainer with experience creating custom workout plans and providing fitness coaching.',
    image: 'https://via.placeholder.com/150/grey',
    price: 40,
  }
];

const Explore = () => {
  return (
    <Flex wrap="wrap" justify="center" p={10} bgGradient="linear(to-tl, #3AAFA9, #2B7A78)">
      {freelancers.map((freelancer, index) => (
        <Box
          key={index}
          bg="rgba(255, 255, 255, 0.1)"
          boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
          backdropFilter="blur(10px)"
          borderRadius="15px"
          m={4}
          p={6}
          width="45%"
          textAlign="center"
          transition="transform 0.3s ease, box-shadow 0.3s ease"
          _hover={{
            transform: 'scale(1.05)',
            boxShadow: '0 6px 40px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Image
            src={freelancer.image}
            alt={freelancer.name}
            borderRadius="full"
            boxSize="150px"
            mb={4}
          />
          <Text fontSize="xl" fontWeight="bold" mb={2}>
            {freelancer.name}
          </Text>
          <Text mb={2}>{freelancer.service}</Text>
          <Text mb={2}>{freelancer.description}</Text>
          <Text fontWeight="bold" mb={4}>
            ${freelancer.price}/hr
          </Text>
          <Button colorScheme="teal">View Profile</Button>
        </Box>
      ))}
    </Flex>
  );
};

export default Explore;
