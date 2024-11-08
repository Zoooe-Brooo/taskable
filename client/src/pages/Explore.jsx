import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFreelancers } from '../utils/redux/freelancersSlice';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import FreelancerProfileModal from '../components/FreelancerProfileModal';

const Explore = () => {
	const dispatch = useDispatch();
    const freelancers = useSelector(state => state.freelancers.freelancers); // Access freelancers from Redux store
    const status = useSelector(state => state.freelancers.status); // For loading state

	useEffect(() => {
		if (status === 'idle') {
		    dispatch(fetchFreelancers()); // Fetch freelancers if not already fetched
		}
	  }, [status, dispatch]);

	const [selectedFreelancer, setSelectedFreelancer] = useState(null);

	const handleViewProfile = (freelancer) => {
		setSelectedFreelancer(freelancer);
	};

	const handleCloseModal = () => {
		setSelectedFreelancer(null);
	};

	return (
		<Flex
			wrap="wrap"
			justify="center"
			p={10}
			bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
		>
			{status === 'loading' ? (
		        <Text>Loading freelancers...</Text>
	        ) : (
		        freelancers.map((freelancer) => {
			        const firstName = freelancer.name.split(' ')[0].toLowerCase();
			        return (
			        	<Box
			        		key={freelancer._id}
			        		bg="rgba(255, 255, 255, 0.1)"
			        		boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
			        		backdropFilter="blur(20px)"
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
			        		display="flex"
			        		flexDirection="column"
			        		alignItems="center"
			        	>
			        		<Image
			        			src={`/public/images/profile-pics/${firstName}.png`}
			        			alt={freelancer.name}
			        			borderRadius="full"
			        			boxSize="200px"
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
			        		<Button
			        			colorScheme="teal"
			        			onClick={() => handleViewProfile(freelancer)}
			        		>
			        			View Profile
			        		</Button>
			        	</Box>
			        );
		        })
		    )}
			{selectedFreelancer && (
			<FreelancerProfileModal
				freelancer={selectedFreelancer}
				isOpen={!!selectedFreelancer}
				onClose={handleCloseModal}
			/>
		    )}
		</Flex>
	);
};

export default Explore;
