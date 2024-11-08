import React from 'react';
import { Box, Flex, Image, Text, Button, VStack, HStack, Icon } from '@chakra-ui/react';
import { StarIcon, CheckCircleIcon } from '@chakra-ui/icons';

const FreelancerProfileModal = ({ freelancer, isOpen, onClose, addToCart }) => {
  if (!isOpen) return null;
  
  const firstName = freelancer.name.split(' ')[0].toLowerCase();

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(0, 0, 0, 0.5)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex="1000"
      onClick={onClose}
    >
      <Box
        bg="rgba(255, 255, 255, 0.4)"
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        backdropFilter="blur(12px)"
        border="1px solid rgba(255, 255, 255, 0.4)"
        width={{ base: '90%', md: '70%' }}
        maxWidth="700px"
        transform="scale(0.9)"
        transition="transform 0.3s ease-out"
        _hover={{ transform: 'scale(1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Flex direction="column" align="center">
          <Image
            src={`/public/images/profile-pics/${firstName}.png`}
            alt={freelancer.name}
            borderRadius="full"
            boxSize="180px"
            mb={4}
          />
          <Text fontSize="3xl" fontWeight="bold" mb={2} color="black">
            {freelancer.name}
          </Text>
          <Text fontSize="lg" mb={2} color="black">
            {freelancer.service}
          </Text>
          <HStack spacing={2} mb={4}>
            <Icon as={StarIcon} color="yellow.400" />
            <Text fontSize="lg" fontWeight="bold" color="black">
              {freelancer.rating}
            </Text>
          </HStack>
          <Text mb={2} fontStyle="italic" color="black">
            {freelancer.description}
          </Text>
          <Text fontWeight="bold" fontSize="xl" mb={4} color="black">
            ${freelancer.price}/hr
          </Text>
          <HStack spacing={4} mb={4}>
            <CheckCircleIcon color="green.400" />
            <Text color="black">Projects Completed: {freelancer.projectsCompleted}</Text>
          </HStack>
          <Text mb={2} color="black">
            Main Skills: {freelancer.skills.join(', ')}
          </Text>
          <Text mb={4} color="black">
            Signed Up: {freelancer.signedUpDuration} years ago
          </Text>
          <HStack spacing={4}>
            <Button colorScheme="teal" size="md" onClick={addToCart}>
              Add to Cart
            </Button>
            <Button colorScheme="red" size="md" onClick={onClose}>
              Close
            </Button>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default FreelancerProfileModal; 