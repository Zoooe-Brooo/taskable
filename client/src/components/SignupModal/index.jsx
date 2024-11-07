import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	FormControl,
	FormLabel,
	Input,
	Divider,
	IconButton,
	Text,
	HStack,
	useToast,
} from '@chakra-ui/react';
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

function SignupModal({ isOpen, onClose }) {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const toast = useToast();

	const [addUser] = useMutation(ADD_USER);

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSignup = async () => {
		try {
			const { data } = await addUser({
				variables: { ...formData },
			});

			// Store token and log the user in
			Auth.login(data.addUser.token);

			// Display success message
			toast({
				title: 'Account created.',
				description: 'Welcome to Taskable!',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});

			// Close the modal
			onClose();
		} catch (error) {
			console.error('Error signing up:', error);
			toast({
				title: 'Error',
				description: 'Could not create account. Please try again.',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay backdropFilter="blur(10px)" />{' '}
			{/* Blurs the background */}
			<ModalContent borderRadius="lg" p={6} bg="white" maxWidth="sm">
				<ModalHeader textAlign="center" fontWeight="bold" fontSize="lg">
					Sign up with
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{/* Social Signup Buttons */}
					<HStack justifyContent="center" mb={4}>
						<Button
							leftIcon={<FaGoogle />}
							variant="outline"
							w="45%"
						>
							Google
						</Button>
						<Button
							leftIcon={<FaApple />}
							variant="outline"
							w="45%"
						>
							Apple
						</Button>
					</HStack>

					{/* Divider with "or" */}
					<HStack alignItems="center" my={4}>
						<Divider />
						<Text color="gray.500" fontSize="sm" px={2}>
							or
						</Text>
						<Divider />
					</HStack>

					{/* First Name Input */}
					<FormControl mb={4}>
						<FormLabel fontSize="sm" color="gray.700">
							First Name
						</FormLabel>
						<Input
							name="firstName"
							type="text"
							placeholder="First Name"
							value={formData.firstName}
							onChange={handleChange}
						/>
					</FormControl>

					{/* Last Name Input */}
					<FormControl mb={4}>
						<FormLabel fontSize="sm" color="gray.700">
							Last Name
						</FormLabel>
						<Input
							name="lastName"
							type="text"
							placeholder="Last Name"
							value={formData.lastName}
							onChange={handleChange}
						/>
					</FormControl>

					{/* Email Input */}
					<FormControl mb={4}>
						<FormLabel fontSize="sm" color="gray.700">
							Email address
						</FormLabel>
						<Input
							name="email"
							type="email"
							placeholder="Email address"
							value={formData.email}
							onChange={handleChange}
						/>
					</FormControl>

					{/* Password Input */}
					<FormControl mb={4} position="relative">
						<FormLabel fontSize="sm" color="gray.700">
							Password
						</FormLabel>
						<Input
							name="password"
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
							pr="4.5rem"
						/>
						{formData.password && (
							<IconButton
								icon={showPassword ? <FaEyeSlash /> : <FaEye />}
								onClick={togglePasswordVisibility}
								aria-label="Toggle password visibility"
								variant="ghost"
								size="sm"
								position="absolute"
								top="50%"
								right="0.5rem"
								transform="translateY(-50%)"
								zIndex="1"
							/>
						)}
					</FormControl>
				</ModalBody>

				<ModalFooter flexDirection="column">
					{/* Signup Button */}
					<Button
						colorScheme="teal"
						w="full"
						mb={3}
						onClick={handleSignup}
					>
						Sign Up
					</Button>

					{/* Login Link */}
					<Text fontSize="md" color="gray.600">
						Already have an account?{' '}
						<Text
							as="span"
							color="teal.600"
							cursor="pointer"
							onClick={onClose} // Close the signup modal and open the login modal if needed
						>
							Log in
						</Text>
					</Text>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default SignupModal;
