import { Box, Link, VStack, Text, Icon, Grid } from '@chakra-ui/react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const PortfolioSection = ({ portfolio }) => {
  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="bold">Portfolio</Text>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {portfolio.projects.map((project, index) => (
          <Box 
            key={index}
            p={4}
            borderRadius="lg"
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10px)"
          >
            <Text fontWeight="bold">{project.name}</Text>
            <Text fontSize="sm" mb={2}>{project.description}</Text>
            <Flex gap={2}>
              {project.github && (
                <Link href={project.github} isExternal>
                  <Icon as={FaGithub} />
                </Link>
              )}
              {project.liveDemo && (
                <Link href={project.liveDemo} isExternal>
                  <Icon as={FaExternalLinkAlt} />
                </Link>
              )}
            </Flex>
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};
