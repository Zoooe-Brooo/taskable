import React, { useState } from 'react';
import { Box, Flex, Text, VStack, Image, Progress, Button } from '@chakra-ui/react';
import FreelancerProfileModal from '../components/FreelancerProfileModal';

const MyProfile = () => {
  const [selectedService, setSelectedService] = useState(null);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    favoriteServices: [
      {
        name: 'Web Development',
        provider: 'Amy Smith',
        image: 'https://via.placeholder.com/150/grey',
        price: 60,
        description: 'A versatile developer skilled in both front-end and back-end technologies.',
        projectsCompleted: 120,
        skills: ['JavaScript', 'React', 'Node.js'],
        signedUpDuration: 3,
      },
      {
        name: 'Graphic Design',
        provider: 'Brianna Johnson',
        image: 'https://via.placeholder.com/150/grey',
        price: 50,
        description: 'A creative designer with a knack for visual storytelling.',
        projectsCompleted: 100,
        skills: ['Photoshop', 'Illustrator', 'InDesign'],
        signedUpDuration: 2,
      },
    ],
    currentJobs: [
      {
        service: 'UI/UX Design',
        provider: 'Mike Williams',
        progress: 70,
      },
      {
        service: 'House Cleaning',
        provider: 'Sarah Martinez',
        progress: 40,
      },
    ],
  };

  const handleViewDetails = (service) => {
    setSelectedService(service);
  };

  const handleCloseModal = () => {
    setSelectedService(null);
  };

  return (
    <Box p={10} bgGradient="linear(to-tl, #3AAFA9, #2B7A78)" minH="100vh">
      <VStack spacing={8} align="stretch">
        <Flex align="center" justify="center">
          <Image
            src="https://via.placeholder.com/150/animated-character"
            alt="Animated Character"
            borderRadius="full"
            boxSize="150px"
            mb={4}
          />
          <VStack align="start" ml={6}>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              {user.name}
            </Text>
            <Text fontSize="lg" color="white">
              {user.email}
            </Text>
          </VStack>
        </Flex>

        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="white" textAlign="center">
            My Favorite Services
          </Text>
          <Flex wrap="wrap" justify="center">
            {user.favoriteServices.map((service, index) => (
              <Box
                key={index}
                bg="rgba(255, 255, 255, 0.1)"
                boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
                backdropFilter="blur(10px)"
                borderRadius="15px"
                m={4}
                p={6}
                width={{ base: '100%', md: '45%' }}
                textAlign="center"
                transition="transform 0.3s ease, box-shadow 0.3s ease"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 40px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Image
                  src={service.image}
                  alt={service.name}
                  borderRadius="full"
                  boxSize="100px"
                  mb={4}
                />
                <Text fontSize="lg" fontWeight="bold" mb={2} color="white">
                  {service.name}
                </Text>
                <Text mb={2} color="white">
                  Provider: {service.provider}
                </Text>
                <Text fontWeight="bold" mb={4} color="white">
                  ${service.price}/hr
                </Text>
                <Button colorScheme="teal" size="sm" onClick={() => handleViewDetails(service)}>
                  View Details
                </Button>
              </Box>
            ))}
          </Flex>
        </Box>

        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={4} color="white" textAlign="center">
            Current Jobs
          </Text>
          {user.currentJobs.map((job, index) => (
            <Box key={index} mb={4}>
              <Text fontSize="lg" fontWeight="bold" color="white">
                {job.service}
              </Text>
              <Text mb={2} color="white">
                Provider: {job.provider}
              </Text>
              <Box position="relative" width="100%">
                <Progress
                  value={job.progress}
                  size="lg"
                  sx={{
                    '& > div': {
                      background: 'linear-gradient(to right, #38A169, #68D391)',
                    },
                  }}
                  bg="rgba(255, 255, 255, 0.2)"
                />
              </Box>
            </Box>
          ))}
        </Box>

        {selectedService && (
          <FreelancerProfileModal
            freelancer={selectedService}
            isOpen={!!selectedService}
            onClose={handleCloseModal}
          />
        )}
      </VStack>
    </Box>
  );
};

export default MyProfile;
