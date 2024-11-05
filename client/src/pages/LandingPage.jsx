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
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	const letters = 'T'.split(''); // will try fix this tonight
	return (
		<>
			<Box
				bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
				minH="80vh"
				color="white"
				padding="0"
				py={20}
				px={10}
				textAlign="center"
				borderBottomRightRadius={{ base: '8rem', md: '16rem' }}
			>
				<HStack spacing={10} align="center" justify="center">
					{/* Left Content */}
					<VStack align="start" pt={30} spacing={4}>
						<Heading fontSize="3xl" pb={5}>
							Where Tasks become <br />
							<HStack spacing="0">
								{letters.map((letter, index) => (
									<Text
										as="span"
										key={index}
										display="inline-block"
										fontSize="5xl"
										pt={10}
										fontWeight="bold"
										sx={{
											animation: `wave 1s ease-in-out ${
												index * 0.2
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
										Taskable
									</Text>
								))}
							</HStack>
						</Heading>
						<Text align="start" fontSize="lg" fontWeight="medium">
							Looking to match with a developer? <br />
							Find the perfect match to tackle any challenge{' '}
							<br />
							with our network of skilled developers.
						</Text>
						<Stack direction="row" spacing={4}>
							<Link to="/login">
								<Button
									colorScheme="gray"
									size="lg"
									mt={6}
									px={8}
									py={6}
									fontSize="lg"
									borderRadius="md"
									variant="solid"
								>
									Login
								</Button>
							</Link>
							<Link to="/signup">
								<Button
									colorScheme="gray"
									size="lg"
									mt={6}
									px={8}
									py={6}
									fontSize="lg"
									borderRadius="md"
									variant="solid"
								>
									Sign Up
								</Button>
							</Link>
						</Stack>
					</VStack>

					{/* Right Content */}
					<Box w="50%" display="flex" justifyContent="center">
						<Image
							src="./public/images/dev1.png"
							alt="Developer at work"
							boxSize="70%"
							objectFit="contain"
						/>
					</Box>
				</HStack>
			</Box>

			{/* About Taskable Section */}
			<Container maxW="container.2xl" py={20}>
				<HStack spacing={10} align="center">
					{/* Left Side Image */}
					<Box w="50%" display="flex" justifyContent="center">
						<Image
							src="./public/images/dev2.png"
							alt="Developer at work"
							boxSize="70%"
							objectFit="contain"
						/>
					</Box>
					{/* Right Side Text */}
					<VStack align="start" spacing={2} maxW="600px">
						<Heading fontSize="2xl" mb={4}>
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
						<Button colorScheme="teal" size="lg">
							Sign up
						</Button>
					</VStack>
				</HStack>
			</Container>
		</>
	);
};

export default LandingPage;
