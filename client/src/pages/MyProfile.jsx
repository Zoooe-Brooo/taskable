import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Box,
	Flex,
	Text,
	VStack,
	Image,
	Button,
	Collapse,
	Grid,
	useColorModeValue,
} from '@chakra-ui/react';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../utils/redux/userSlice';
import FreelancerProfileModal from '../components/FreelancerProfileModal';

const MyProfile = () => {
	const dispatch = useDispatch();
    const user = useSelector((state) => state.user.data);
    const status = useSelector((state) => state.user.status);
    const error = useSelector((state) => state.user.error);
    const favoriteServices = useSelector((state) => state.user.favoriteServices);
    const navigate = useNavigate();
    const [selectedFreelancer, setSelectedFreelancer] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const bgColor = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.5)');
    const textColor = useColorModeValue('gray.800', 'white');

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchUserProfile());
		}
	}, [dispatch, status]);

	useEffect(() => {
		if (status === 'succeeded' && !user) {
			navigate('/');
		}
	}, [status, user, navigate]);

	if (status === 'loading') {
		return (
			<Box
				p={10}
				bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
				minH="100vh"
			>
				<Text color="white" fontSize="xl" textAlign="center">
					Loading profile...
				</Text>
			</Box>
		);
	}

	if (status === 'failed') {
		console.log(error); // Log the error to the console
		return (
			<Box
				p={10}
				bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
				minH="100vh"
			>
				<Text color="white" fontSize="xl" textAlign="center">
					Error: {error}
				</Text>
			</Box>
		);
	}

	if (!user) {
		navigate('/');
		return null;
	}

	const handleSignOut = () => {
		Auth.logout();
		navigate('/');
	};

	const handleViewProfile = (service) => {
		setSelectedFreelancer(service);
	};

	const handleCloseModal = () => {
		setSelectedFreelancer(null);
	};

	const toggleOrderDetails = (orderId) => {
		setExpandedOrder(expandedOrder === orderId ? null : orderId);
	};

	return (
		<Box
			p={10}
			mt={4}
			bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
			minH="100vh"
		>
			<VStack spacing={8} align="stretch">
				<Flex align="center" justify="space-between" width="100%">
					<Flex align="center">
						<Box
							position="relative"
							borderRadius="full"
							boxSize="150px"
							overflow="hidden"
							border="3px solid white"
							boxShadow="0 4px 30px rgba(0, 0, 0, 0.2)"
						>
							<Image
								src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba"
								alt="Profile Picture"
								width="100%"
								height="100%"
								objectFit="cover"
								transition="transform 0.3s ease"
								_hover={{
									transform: 'scale(1.1)',
								}}
							/>
						</Box>
						<VStack align="start" ml={8} spacing={3}>
							<Text
								fontSize="3xl"
								fontWeight="bold"
								color="white"
								textShadow="2px 2px 4px rgba(0,0,0,0.2)"
							>
								{user.firstName} {user.lastName}
							</Text>
							<Text
								fontSize="lg"
								color="whiteAlpha.900"
								bg="rgba(0,0,0,0.2)"
								px={4}
								py={2}
								borderRadius="full"
							>
								{user.email}
							</Text>
						</VStack>
					</Flex>
					<Button
						ml={4}
						colorScheme="red"
						onClick={handleSignOut}
						size="md"
						boxShadow="lg"
						_hover={{
							transform: 'translateY(-2px)',
							boxShadow: 'xl',
						}}
						transition="all 0.2s"
					>
						Sign Out
					</Button>
				</Flex>
			</VStack>

			<Box mt={8}>
				<Text
					fontSize="2xl"
					fontWeight="bold"
					mb={4}
					color={textColor}
					textAlign="center"
				>
					Order History
				</Text>
				<Grid templateColumns="repeat(3, 1fr)" gap={6}>
					{user.orders.map((order) => (
						<Box
							key={order._id}
							bg={bgColor}
							p={6}
							borderRadius="lg"
							boxShadow="lg"
							transition="all 0.3s"
							_hover={{ boxShadow: 'xl' }}
							backdropFilter="blur(10px)"
							border="1px solid rgba(255, 255, 255, 0.3)"
						>
							<Text fontSize="lg" fontWeight="bold" mb={2} color={textColor}>
								Purchase Date: {new Date(Math.floor(order.purchaseDate)).toLocaleDateString()}
							</Text>
							<Button
								onClick={() => toggleOrderDetails(order._id)}
								colorScheme="teal"
								size="sm"
								mb={4}
							>
								{expandedOrder === order._id ? 'See Less' : 'See More'}
							</Button>
							<Collapse in={expandedOrder === order._id} animateOpacity>
								<Grid templateColumns="repeat(1, 1fr)" gap={4}>
									{order.freelancers.map((freelancer) => (
										<Box
											key={freelancer._id}
											bg="rgba(255, 255, 255, 0.1)"
											p={4}
											borderRadius="lg"
											boxShadow="md"
											transition="all 0.3s"
											_hover={{ boxShadow: 'lg' }}
										>
											<Text fontSize="md" fontWeight="bold" color={textColor}>
												{freelancer.name}
											</Text>
											<Text fontWeight="bold" mb={2} color={textColor}>
												${freelancer.price}/hr
											</Text>
											<Text mb={2} color={textColor}>{freelancer.service}</Text>
										</Box>
									))}
								</Grid>
							</Collapse>
						</Box>
					))}
				</Grid>
			</Box>

			<Box>
				<Text
					fontSize="2xl"
					fontWeight="bold"
					mb={4}
					color="white"
					textAlign="center"
				>
					My Favorite Services
				</Text>
				<Flex wrap="wrap" justify="center">
					{favoriteServices?.map((service, index) => (
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
								cursor: 'pointer',
							}}
							onClick={() => handleViewProfile(service)}
						>
							<Image
								src={`/images/profile-pics/${service.name
									.split(' ')[0]
									.toLowerCase()}.png`}
								alt={service.name}
								borderRadius="full"
								boxSize="100px"
								mx="auto"
								mb={4}
							/>
							<Text fontSize="lg" fontWeight="bold" color="white">
								{service.name}
							</Text>
							<Text color="white" mb={2}>
								{service.service}
							</Text>
							<Text fontWeight="bold" color="white">
								${service.price}/hr
							</Text>
						</Box>
					))}
				</Flex>
			</Box>

			{selectedFreelancer && (
				<FreelancerProfileModal
					freelancer={selectedFreelancer}
					isOpen={!!selectedFreelancer}
					onClose={handleCloseModal}
				/>
			)}
		</Box>
	);
};

export default MyProfile;
