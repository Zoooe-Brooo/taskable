import React from 'react';
import { 
  Box, 
  Flex, 
  Image, 
  Text, 
  Button, 
  VStack, 
  HStack, 
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Divider
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../utils/redux/freelancersSlice';
// import { addFavoriteService, removeFavoriteService } from '../utils/redux/userSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { idbPromise } from '../utils/helpers';

const FreelancerProfileModal = ({ freelancer, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const favoriteServices = useSelector(state => state.user.favoriteServices);
  
  if (!isOpen) return null;

  const isFavorite = favoriteServices.some(service => service._id === freelancer._id);
  const firstName = freelancer.name.split(' ')[0].toLowerCase();

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavoriteService(freelancer));
    } else {
      dispatch(addFavoriteService(freelancer));
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...freelancer,
      purchaseQuantity: 1
    }));
    idbPromise('cart', 'put', {
      ...freelancer,
      purchaseQuantity: 1
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay 
        bg="blackAlpha.300"
        backdropFilter="blur(10px)"
      />
      <ModalContent
        bg="rgba(255, 255, 255, 0.8)"
        backdropFilter="blur(20px)"
        borderRadius="2xl"
        boxShadow="xl"
        border="1px solid rgba(255, 255, 255, 0.3)"
      >
        <ModalBody p={8}>
          <VStack spacing={6}>
            <Flex direction="column" align="center" position="relative" w="100%">
              <IconButton
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                icon={isFavorite ? <FaHeart /> : <FaRegHeart />}
                colorScheme={isFavorite ? "red" : "gray"}
                onClick={handleToggleFavorite}
                position="absolute"
                right="0"
                top="0"
                size="lg"
                variant="ghost"
                _hover={{
                  transform: 'scale(1.1)',
                }}
                transition="all 0.2s"
              />
              <Image
                src={`/images/profile-pics/${firstName}.png`}
                alt={freelancer.name}
                borderRadius="full"
                boxSize="200px"
                mb={4}
              />
              <Text fontSize="3xl" fontWeight="bold" mb={2}>
                {freelancer.name}
              </Text>
              <Text fontSize="xl" color="gray.600" mb={2}>
                {freelancer.service}
              </Text>
              <Text textAlign="center" mb={4} color="gray.600">
                {freelancer.description}
              </Text>
              <Text fontWeight="bold" fontSize="2xl" color="teal.600" mb={6}>
                ${freelancer.price}/hr
              </Text>
            </Flex>

            <HStack spacing={4}>
              <Button 
                colorScheme="teal" 
                size="lg" 
                onClick={handleAddToCart}
                leftIcon={<CheckCircleIcon />}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Add to Cart
              </Button>
              <Button 
                colorScheme="gray" 
                size="lg" 
                onClick={onClose}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                transition="all 0.2s"
              >
                Close
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FreelancerProfileModal;