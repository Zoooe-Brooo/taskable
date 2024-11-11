import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchFreelancers,
	addToCart,
	clearNotification,
} from '../utils/redux/freelancersSlice';
import { Box, Flex, Image, Text, Button } from '@chakra-ui/react';
import FreelancerProfileModal from '../components/FreelancerProfileModal';
import SearchFilters from '../components/SearchFilters';

const Explore = () => {
	const dispatch = useDispatch();
	const freelancers = useSelector((state) => state.freelancers.freelancers);
	const status = useSelector((state) => state.freelancers.status);
	const error = useSelector((state) => state.freelancers.error);
	const [selectedFreelancer, setSelectedFreelancer] = useState(null);
	const [filters, setFilters] = useState({
		search: '',
		category: '',
		priceRange: [0, 200],
	});

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchFreelancers());
		}
	}, [status, dispatch]);

	const handleViewProfile = (freelancer) => {
		setSelectedFreelancer(freelancer);
	};

	const handleCloseModal = () => {
		setSelectedFreelancer(null);
	};

	const handleAddToCart = (freelancer) => {
		dispatch(addToCart(freelancer));
		setTimeout(() => {
			dispatch(clearNotification());
		}, 3000);
	};

	const handleFilterChange = (filterType, value) => {
		setFilters((prev) => ({
			...prev,
			[filterType]: value,
		}));
	};

	const filteredFreelancers = freelancers.filter((freelancer) => {
		const matchesSearch =
			freelancer.name
				.toLowerCase()
				.includes(filters.search.toLowerCase()) ||
			freelancer.service
				.toLowerCase()
				.includes(filters.search.toLowerCase());
		const matchesCategory =
			!filters.category || freelancer.category === filters.category;
		const matchesPrice =
			freelancer.price >= filters.priceRange[0] &&
			freelancer.price <= filters.priceRange[1];

		return matchesSearch && matchesCategory && matchesPrice;
	});

	const renderContent = () => {
		if (status === 'loading') {
			return (
				<Flex
					justify="center"
					align="center"
					minH="100vh"
					bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
				>
					<Text color="white" fontSize="xl">
						Loading freelancers...
					</Text>
				</Flex>
			);
		}

		if (error) {
			return (
				<Flex
					direction="column"
					justify="center"
					align="center"
					minH="100vh"
					bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
				>
					<Text color="white" fontSize="xl" mb={4}>
						Error: {error}
					</Text>
					<Button
						colorScheme="teal"
						onClick={() => dispatch(fetchFreelancers())}
					>
						Try Again
					</Button>
				</Flex>
			);
		}

		return (
			<Box bgGradient="linear(to-tl, #3AAFA9, #2B7A78)" minH="100vh">
				<SearchFilters
					onFilterChange={handleFilterChange}
					filters={filters}
				/>
				<Flex wrap="wrap" justify="center" p={10}>
					{filteredFreelancers.map((freelancer) => {
						const firstName = freelancer.name
							.split(' ')[0]
							.toLowerCase();
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
									src={`/images/profile-pics/${firstName}.png`}
									alt={freelancer.name}
									borderRadius="full"
									boxSize="200px"
									mb={4}
								/>
								<Text
									fontSize="xl"
									fontWeight="bold"
									mb={2}
									color="white"
								>
									{freelancer.name}
								</Text>
								<Text mb={2} color="white">
									{freelancer.service}
								</Text>
								<Text mb={2} color="white">
									{freelancer.description}
								</Text>
								<Text fontWeight="bold" mb={4} color="white">
									${freelancer.price}/hr
								</Text>
								<Button
									colorScheme="teal"
									onClick={() =>
										handleViewProfile(freelancer)
									}
								>
									View Profile
								</Button>
							</Box>
						);
					})}
				</Flex>
			</Box>
		);
	};

	return (
		<>
			{renderContent()}
			{selectedFreelancer && (
				<FreelancerProfileModal
					freelancer={selectedFreelancer}
					isOpen={!!selectedFreelancer}
					onClose={handleCloseModal}
				/>
			)}
		</>
	);
};

export default Explore;
