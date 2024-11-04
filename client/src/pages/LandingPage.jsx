import { Box, Heading, Text, Button, VStack, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<Box
			bgGradient="linear(to-tl, #3AAFA9, #2B7A78)"
			minH="80vh"
			color="white"
			padding="0"
			py={20}
			px={10}
			textAlign="center"
			borderBottomRightRadius="16rem"
		>
			{/* Main Content */}
			<VStack align="start" pt={60} spacing={4}>
				<Heading fontSize="2xl" fontWeight="bold">
					Developers to Solve Your Problems 👉🏻 🤓
				</Heading>
				<Text align="start" fontSize="lg" fontWeight="medium">
					Looking for a Dev? <br />
					Find the perfect match to tackle any challenge <br />
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
		</Box>
	);
};

export default LandingPage;
