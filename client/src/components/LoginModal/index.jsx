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
} from '@chakra-ui/react';
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useToast } from '@chakra-ui/react';

function LoginModal({ isOpen, onClose, onSwitchToSignup }) {
	const [showPassword, setShowPassword] = useState(false);
	const [formState, setFormState] = useState({ email: '', password: '' });
	const [login, { error }] = useMutation(LOGIN);
	const toast = useToast();
	const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		
		// Validate inputs
		if (!formState.email || !formState.password) {
			toast({
				title: 'Error',
				description: 'Please fill in all fields',
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
			return;
		}

		try {
			const { data } = await login({
				variables: { ...formState },
			});
			Auth.login(data.login.token);
			toast({
				title: 'Success',
				description: 'You have successfully logged in!',
				status: 'success',
				duration: 3000,
				isClosable: true,
			});
			onClose();
		} catch (err) {
			toast({
				title: 'Error',
				description: err.message,
				status: 'error',
				duration: 3000,
				isClosable: true,
			});
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const togglePasswordVisibility = () => setShowPassword(!showPassword);

	return (
		<Modal isOpen={isOpen} onClose={onClose} isCentered>
			<ModalOverlay backdropFilter="blur(10px)" />{' '}
			{/* Blurs the background */}
			<ModalContent borderRadius="lg" p={6} bg="white" maxWidth="sm">
				<ModalHeader textAlign="center" fontWeight="bold" fontSize="lg">
					Login in with
				</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleFormSubmit}>
					<ModalBody>
						{/* Social Login Buttons */}
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
						{/* Email Input */}
						<FormControl mb={4}>
							<FormLabel fontSize="sm" color="gray.700">
								Email address
							</FormLabel>
							<Input
								type="email"
								placeholder="Email address"
								name="email"
								value={formState.email}
								onChange={handleChange}
							/>
						</FormControl>

						{/* Password Input */}
						<FormControl mb={4}>
							<FormLabel fontSize="sm" color="gray.700">
								Password
							</FormLabel>
							<Input
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								name="password"
								value={formState.password}
								onChange={handleChange}
								pr="4.5rem"
								mb={2}
							/>
							{formState.password && (
								<IconButton
									icon={showPassword ? <FaEyeSlash /> : <FaEye />}
									onClick={togglePasswordVisibility}
									aria-label="Toggle password visibility"
									variant="ghost"
									size="xs"
									position="absolute"
									top="65%"
									right="5px"
									p="0"
									transform="translateY(-50%)"
									zIndex="1"
								/>
							)}
						</FormControl>
						{/* Forgot Password Link */}
						<Text
							color="teal.600"
							fontSize="sm"
							textAlign="right"
							mb={4}
							cursor="pointer"
							onClick={() => setIsForgotPasswordOpen(true)}
							_hover={{ textDecoration: 'underline' }}
						>
							Forgot Password?
						</Text>
					</ModalBody>
					<ModalFooter flexDirection="column">
						{/* Login Button */}
						<Button type="submit" colorScheme="teal" w="full" mb={3}>
							Log In
						</Button>

						{/* Signup Link */}
						<Text fontSize="md" color="gray.600">
							Don't have an account?{' '}
							<Text
								as="span"
								color="teal.600"
								cursor="pointer"
								onClick={onSwitchToSignup}
								_hover={{ textDecoration: 'underline' }}
							>
								Sign up
							</Text>
						</Text>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
}

export default LoginModal;
