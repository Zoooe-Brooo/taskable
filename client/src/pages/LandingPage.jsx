import {
	Box,
	Heading,
	Text,
	Button,
	VStack,
	Stack,
	HStack,
	Image,
	Container,
	useDisclosure,
} from '@chakra-ui/react';
// import { Link } from 'react-router-dom'; will use later
import LoginModal from '../components/LoginModal';
import SignupModal from '../components/SignupModal';
// import { useState } from 'react'; will use later

const LandingPage = () => {
	const {
		isOpen: isLoginOpen,
		onOpen: onLoginOpen,
		onClose: onLoginClose,
	} = useDisclosure();
	const {
		isOpen: isSignupOpen,
		onOpen: onSignupOpen,
		onClose: onSignupClose,
	} = useDisclosure();

	const letters = 'Taskable'.split('');
	return (
		<>
			<Box
				bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
				minH="80vh"
				color="white"
				textAlign="center"
				borderBottomRightRadius={{ base: '8rem', md: '16rem' }}
			>
				<HStack
					spacing={10}
					align="center"
					justify="center"
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					{/* Left Content */}
					<VStack
						align={{ base: 'center', md: 'center' }}
						justify="center"
						pt={{ base: 10, md: 30 }}
						spacing={4}
						textAlign={{ base: 'center', md: 'center' }}
					>
						<Heading fontSize={{ base: '5xl', md: '3xl' }} pb={5}>
							Where Tasks become <br />
							<HStack
								spacing="0"
								justifyContent={{
									base: 'center',
									md: 'center',
								}}
							>
								{letters.map((letter, index) => (
									<Text
										as="span"
										key={index}
										display="inline-block"
										fontSize={{ base: '5xl', md: '5xl' }}
										pt={10}
										fontWeight="bold"
										sx={{
											animation: `wave 2s ease-in-out ${
												index * 0.1
											}s infinite`,
											'@keyframes wave': {
												'0%': {
													transform: 'translateY(0)',
												},
												'50%': {
													transform:
														'translateY(-10px)',
												},
												'100%': {
													transform: 'translateY(0)',
												},
											},
										}}
									>
										{letter}
									</Text>
								))}
							</HStack>
						</Heading>
						<Text
							align="start"
							fontSize="lg"
							fontWeight="medium"
							textAlign={{
								base: 'center',
								md: 'center',
							}}
						>
							Looking to match with a developer? <br />
							Find the perfect match to tackle any challenge{' '}
							<br />
							with our network of skilled developers.
						</Text>
						<Stack direction="row" spacing={4} justify="center">
							<Button
								colorScheme="gray"
								size="lg"
								mt={6}
								px={8}
								py={6}
								fontSize="lg"
								borderRadius="md"
								variant="solid"
								onClick={onLoginOpen}
							>
								Login
							</Button>

							<Button
								colorScheme="gray"
								size="lg"
								mt={6}
								px={8}
								py={6}
								fontSize="lg"
								borderRadius="md"
								variant="solid"
								onClick={onSignupOpen}
							>
								Sign Up
							</Button>
						</Stack>
					</VStack>

					{/* Right Content */}
					<Box
						w={{ base: '100%', md: '50%' }}
						display="flex"
						justifyContent="center"
					>
						<Image
							src="/images/dev1.png"
							alt="Developer at work"
							boxSize={{ base: '90%', md: '70%' }}
							objectFit="contain"
						/>
					</Box>
				</HStack>
			</Box>
			<LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
			<SignupModal isOpen={isSignupOpen} onClose={onSignupClose} />

			{/* About Taskable Section */}
			<Container maxW="container.2xl" py={{ base: 10, md: 20 }}>
				<HStack
					spacing={10}
					align="center"
					flexDirection={{ base: 'column', lg: 'row' }}
				>
					{/* Left Side Image */}
					<Box
						w={{ base: '100%', md: '50%' }}
						display="flex"
						justifyContent="center"
					>
						<Image
							src="/images/dev2.png"
							alt="Developer at work"
							boxSize={{ base: '90%', md: '70%' }}
							objectFit="contain"
						/>
					</Box>
					{/* Right Side Text */}
					<VStack
						align={{ base: 'center', md: 'start' }}
						spacing={2}
						maxW={{ base: '100%', md: '600px' }}
						justifyContent="center"
					>
						<Heading
							fontSize="2xl"
							mb={4}
							aligntext={{ base: 'center', md: 'start' }}
						>
							About Taskable
						</Heading>
						<Text fontSize="lg" mb={6}>
							Taskable is your partner in productivity. We help
							you connect with skilled developers to tackle any
							challenge, from small tasks to large projects. Our
							platform makes it easy to find the right person for
							the job, ensuring that your tasks are handled
							efficiently and professionally.
						</Text>
						<Text fontSize="lg" mb={6}>
							Our team is dedicated to providing you with a
							seamless experience, connecting you to a network of
							highly skilled professionals who are ready to bring
							your ideas to life. Whether you&#39;re a business
							owner or an individual with a vision,{' '}
							<Text as="span" color="teal" fontWeight={'bold'}>
								Taskable
							</Text>{' '}
							is here to help you make it a reality.
						</Text>
						<Button
							colorScheme="teal"
							size="lg"
							onClick={onSignupOpen}
						>
							Sign up
						</Button>
					</VStack>
					<SignupModal
						isOpen={isSignupOpen}
						onClose={onSignupClose}
					/>
				</HStack>
			</Container>
		</>
	);
};

export default LandingPage;
