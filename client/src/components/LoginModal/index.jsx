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

function LoginModal({ isOpen, onClose }) {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');

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
						<Input type="email" placeholder="Email address" />
					</FormControl>

					{/* Password Input */}
					<FormControl mb={4}>
						<FormLabel fontSize="sm" color="gray.700">
							Password
						</FormLabel>
						<Input
							type={showPassword ? 'text' : 'password'}
							placeholder="Password"
							pr="4.5rem"
							mb={2}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{password && (
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
					>
						Forgot Password?
					</Text>
				</ModalBody>
				<ModalFooter flexDirection="column">
					{/* Login Button */}
					<Button colorScheme="teal" w="full" mb={3}>
						Log In
					</Button>

					{/* Signup Link */}
					<Text fontSize="md" color="gray.600">
						Don’t have an account?{' '}
						<Text as="span" color="teal.600" cursor="pointer">
							Signup now
						</Text>
					</Text>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default LoginModal;
