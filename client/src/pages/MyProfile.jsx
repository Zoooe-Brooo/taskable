import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Box,
	Flex,
	Text,
	VStack,
	Image,
	Progress,
	Button,
} from '@chakra-ui/react';
import FreelancerProfileModal from '../components/FreelancerProfileModal';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../utils/redux/userSlice';
import { createSelector } from '@reduxjs/toolkit';

const selectUserData = createSelector(
	(state) => state.user,
	(user) => ({
		profile: user.profile,
		status: user.status,
		error: user.error,
		favoriteServices: user.favoriteServices || [],
	})
);

const MyProfile = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { profile, status, error, favoriteServices } =
		useSelector(selectUserData);
	const [selectedService, setSelectedService] = useState(null);

	const handleSignOut = () => {
		Auth.logout();
		navigate('/');
	};

	useEffect(() => {
		if (!Auth.loggedIn()) {
			navigate('/');
		} else {
			const savedFavorites = localStorage.getItem('favoriteServices');
			if (savedFavorites) {
				try {
					const parsedFavorites = JSON.parse(savedFavorites);
					dispatch({
						type: 'user/setFavoriteServices',
						payload: parsedFavorites,
					});
				} catch (error) {
					console.error('Error parsing favorites:', error);
				}
			}
			if (!profile) {
				dispatch(fetchUserProfile());
			}
		}
	}, [dispatch, navigate, profile]);

	useEffect(() => {
		console.log('Favorite services updated:', favoriteServices);
	}, [favoriteServices]);

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

	if (
		error &&
		error !== "Cannot read properties of null (reading 'orders')"
	) {
		return (
			<Box
				p={10}
				bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
				minH="100vh"
			>
				<Text color="white" fontSize="xl" textAlign="center">
					Error loading profile: {error}
				</Text>
				<Button
					onClick={() => dispatch(fetchUserProfile())}
					mt={4}
					colorScheme="teal"
				>
					Retry
				</Button>
			</Box>
		);
	}

	if (!profile) {
		return (
			<Box
				p={10}
				bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
				minH="100vh"
			>
				<Text color="white" fontSize="xl" textAlign="center">
					No profile data available
				</Text>
			</Box>
		);
	}

	const handleViewDetails = (service) => {
		setSelectedService(service);
	};

	const handleCloseModal = () => {
		setSelectedService(null);
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
								{profile?.firstName} {profile?.lastName}
							</Text>
							<Text
								fontSize="lg"
								color="whiteAlpha.900"
								bg="rgba(0,0,0,0.2)"
								px={4}
								py={2}
								borderRadius="full"
							>
								{profile?.email}
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
						{favoriteServices.map((service, index) => (
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
								<Text
									fontSize="lg"
									fontWeight="bold"
									mb={2}
									color="white"
								>
									{service.name}
								</Text>
								<Text mb={2} color="white">
									{service.service}
								</Text>
								<Text fontWeight="bold" mb={4} color="white">
									${service.price}/hr
								</Text>
								<Button
									colorScheme="teal"
									size="sm"
									onClick={() => handleViewDetails(service)}
								>
									View Details
								</Button>
							</Box>
						))}
					</Flex>
				</Box>

				<Box>
					<Text
						fontSize="2xl"
						fontWeight="bold"
						mb={4}
						color="white"
						textAlign="center"
					>
						Current Jobs
					</Text>
					{/* First Job */}
					<Box
						bg="rgba(255, 255, 255, 0.1)"
						p={4}
						borderRadius="lg"
						backdropFilter="blur(10px)"
						mb={4}
					>
						<Text fontSize="lg" fontWeight="bold" color="white">
							Website Development
						</Text>
						<Text mb={2} color="white">
							Provider: John Smith
						</Text>
						<Text mb={2} color="white" fontSize="sm">
							Started: 2024-03-01
						</Text>
						<Text mb={3} color="white" fontSize="sm">
							Estimated Completion: 2024-03-30
						</Text>
						<Box position="relative" width="100%">
							<Progress
								value={75}
								size="lg"
								sx={{
									'& > div': {
										background:
											'linear-gradient(to right, #38A169, #68D391)',
									},
								}}
								bg="rgba(255, 255, 255, 0.2)"
							/>
							<Text
								color="white"
								position="absolute"
								right="0"
								top="-25px"
								fontSize="sm"
							>
								75% Complete
							</Text>
						</Box>
					</Box>

					{/* Second Job */}
					<Box
						bg="rgba(255, 255, 255, 0.1)"
						p={4}
						borderRadius="lg"
						backdropFilter="blur(10px)"
						mb={4}
					>
						<Text fontSize="lg" fontWeight="bold" color="white">
							Mobile App Design
						</Text>
						<Text mb={2} color="white">
							Provider: Sarah Johnson
						</Text>
						<Text mb={2} color="white" fontSize="sm">
							Started: 2024-03-10
						</Text>
						<Text mb={3} color="white" fontSize="sm">
							Estimated Completion: 2024-04-15
						</Text>
						<Box position="relative" width="100%">
							<Progress
								value={30}
								size="lg"
								sx={{
									'& > div': {
										background:
											'linear-gradient(to right, #38A169, #68D391)',
									},
								}}
								bg="rgba(255, 255, 255, 0.2)"
							/>
							<Text
								color="white"
								position="absolute"
								right="0"
								top="-25px"
								fontSize="sm"
							>
								30% Complete
							</Text>
						</Box>
					</Box>

					{/* Third Job */}
					<Box
						bg="rgba(255, 255, 255, 0.1)"
						p={4}
						borderRadius="lg"
						backdropFilter="blur(10px)"
						mb={4}
					>
						<Text fontSize="lg" fontWeight="bold" color="white">
							Database Optimization
						</Text>
						<Text mb={2} color="white">
							Provider: Mike Wilson
						</Text>
						<Text mb={2} color="white" fontSize="sm">
							Started: 2024-02-15
						</Text>
						<Text mb={3} color="white" fontSize="sm">
							Estimated Completion: 2024-03-20
						</Text>
						<Box position="relative" width="100%">
							<Progress
								value={50}
								size="lg"
								sx={{
									'& > div': {
										background:
											'linear-gradient(to right, #38A169, #68D391)',
									},
								}}
								bg="rgba(255, 255, 255, 0.2)"
							/>
							<Text
								color="white"
								position="absolute"
								right="0"
								top="-25px"
								fontSize="sm"
							>
								50% Complete
							</Text>
						</Box>
					</Box>
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
