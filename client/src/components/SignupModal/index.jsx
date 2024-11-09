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
import { useNavigate } from 'react-router-dom';

function SignupModal({ isOpen, onClose, onSwitchToLogin }) {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
			firstName: '',
			lastName: '',
			email: '',
			password: '',
	});
	const toast = useToast();
	const navigate = useNavigate();

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
		// Validate all fields are filled
		if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
			toast({
				title: 'Error',
				description: 'Please fill in all fields',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			toast({
				title: 'Error',
				description: 'Please enter a valid email address',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		// Validate password strength (at least 8 characters)
		if (formData.password.length < 8) {
			toast({
				title: 'Error',
				description: 'Password must be at least 8 characters long',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		try {
			console.log('Sending signup data:', formData);
			const { data } = await addUser({
				variables: { ...formData },
			});
			console.log('Server response:', data);
			Auth.login(data.addUser.token);
			toast({
				title: 'Account created.',
				description: 'Welcome to Taskable!',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			onClose();
			navigate('/explore');
		} catch (error) {
			console.error('Full error object:', error);
			toast({
				title: 'Error',
				description: error.message || 'Could not create account. Please try again.',
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
				<form onSubmit={(e) => {
					e.preventDefault();
					handleSignup();
				}}>
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
							type="submit"
							colorScheme="teal"
							w="full"
							mb={3}
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
								onClick={onSwitchToLogin}
							>
								Log in
							</Text>
						</Text>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}

export default SignupModal;
