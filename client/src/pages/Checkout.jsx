import {
	Box,
	Flex,
	Image,
	Text,
	Button,
	VStack,
	HStack,
	useDisclosure,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Icon,
} from '@chakra-ui/react';
import { FaTimesCircle } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../utils/redux/freelancersSlice';
import { idbPromise } from '../utils/helpers';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { QUERY_CHECKOUT } from '../utils/queries';
import Auth from '../utils/auth';
import { Link } from 'react-router-dom';

const stripePromise = loadStripe('pk_test_L1f0e3XAzjsG7jtp4uN7L9ql');

const Checkout = () => {
	const cart = useSelector((state) => state.freelancers.cart);
	const dispatch = useDispatch();

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

	useEffect(() => {
		if (data && data.checkout && data.checkout.session) {
			stripePromise.then((stripe) => {
				stripe.redirectToCheckout({ sessionId: data.checkout.session });
			});
		}
	}, [data]);

	const calculateTotal = () => {
		return cart
			.reduce(
				(sum, service) =>
					sum + service.price * service.purchaseQuantity,
				0
			)
			.toFixed(2);
	};

	const handleRemoveItem = (item) => {
		dispatch(removeFromCart(item));
		idbPromise('cart', 'delete', item);
	};

	function submitCheckout() {
		if (cart.length === 0) {
			// Check if cart is empty
			onOpen(); // Open warning modal if cart is empty
		} else {
			const freelancerIds = [];

			cart.forEach((item) => {
				for (let i = 0; i < item.purchaseQuantity; i++) {
					freelancerIds.push(item._id);
				}
			});

			getCheckout({
				variables: { freelancers: freelancerIds },
			}).catch((error) => {
				console.error('Error with checkout:', error);
			});
		}
	}

	return (
		<Box p={5} bgGradient="linear(to-r, teal.500, green.500)" minH="100vh">
			<VStack spacing={8} align="stretch">
				<Text
					fontSize="3xl"
					fontWeight="bold"
					color="white"
					textAlign="center"
				>
					Checkout
				</Text>
				{cart.map((service) => (
					<Flex
						key={service._id}
						bg="rgba(255, 255, 255, 0.2)"
						p={4}
						borderRadius="md"
						boxShadow="lg"
						align="center"
						direction={{ base: 'column', md: 'row' }}
						backdropFilter="blur(10px)"
						border="1px solid rgba(255, 255, 255, 0.3)"
					>
						<Image
							src={`/images/profile-pics/${service.name
								.split(' ')[0]
								.toLowerCase()}.png`}
							alt={service.name}
							boxSize="100px"
							mr={4}
							mb={{ base: 4, md: 0 }}
						/>
						<Box
							flex="1"
							textAlign={{ base: 'center', md: 'left' }}
						>
							<Text
								fontSize="lg"
								fontWeight="bold"
								color="gray.800"
							>
								{service.name}
							</Text>
							<Text color="gray.700">
								Price per Hour: ${service.price}
							</Text>
							<Text color="gray.700">
								Quantity: {service.purchaseQuantity}
							</Text>
						</Box>
						<Button
							colorScheme="red"
							mt={{ base: 4, md: 0 }}
							onClick={() => handleRemoveItem(service)}
						>
							Remove
						</Button>
					</Flex>
				))}
				<HStack
					justify="space-between"
					p={4}
					bg="rgba(255, 255, 255, 0.2)"
					borderRadius="md"
					boxShadow="lg"
				>
					<Text fontSize="lg" fontWeight="bold" color="gray.800">
						Total: ${calculateTotal()}
					</Text>

					{Auth.loggedIn() ? (
						<Button
							colorScheme="teal"
							onClick={() => submitCheckout()}
						>
							Proceed to Payment
						</Button>
					) : (
						<Button colorScheme="teal" as={Link} to="/">
							Login/Signup to Checkout
						</Button>
					)}
				</HStack>
			</VStack>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay backdropFilter="blur(5px)" />

				<ModalContent
					borderRadius="md"
					maxW="sm"
					textAlign="center"
					p={6}
				>
					<ModalHeader>
						<VStack spacing={2}>
							<Icon
								as={FaTimesCircle}
								color="red.500"
								boxSize={12}
							/>
							<Text
								fontSize="xl"
								fontWeight="bold"
								color="gray.700"
							>
								Uh Oh!
							</Text>
						</VStack>
					</ModalHeader>

					<ModalBody>
						<Text color="gray.600" fontSize="md">
							Can not proceed to payment because there are no
							items added to the cart.
						</Text>
					</ModalBody>

					<ModalFooter justifyContent="center">
						<Button colorScheme="teal" onClick={onClose} px={8}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default Checkout;
