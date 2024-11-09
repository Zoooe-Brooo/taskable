import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { FaStar, FaStarHalf, FaRegStar } from 'react-icons/fa';

const RatingDisplay = ({ rating, numReviews }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<Icon key={i} as={FaStar} color="yellow.400" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<Icon key={i} as={FaStarHalf} color="yellow.400" />);
    } else {
      stars.push(<Icon key={i} as={FaRegStar} color="yellow.400" />);
    }
  }

  return (
    <Flex align="center">
      <Box>{stars}</Box>
      <Text ml={2} color="gray.500">
        ({numReviews} reviews)
      </Text>
    </Flex>
  );
};

export default RatingDisplay;
