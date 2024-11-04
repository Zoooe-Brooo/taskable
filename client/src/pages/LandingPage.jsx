import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<Box textAlign="center" p={10}>
			<Heading mb={6}>Welcome to Our Platform</Heading>
			<Text mb={6}>
				Explore our amazing features and enjoy a seamless experience.
			</Text>
			<Stack direction="row" spacing={4} justify="center">
				<Link to="/login">
					<Button colorScheme="teal" size="lg">
						Log In
					</Button>
				</Link>
				<Link to="/signup">
					<Button colorScheme="teal" size="lg">
						Sign Up
					</Button>
				</Link>
			</Stack>
		</Box>
	);
};

export default LandingPage;
