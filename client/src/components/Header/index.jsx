import { useState, useEffect } from 'react';
import {
	Box,
	Flex,
	Text,
	IconButton,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Badge,
} from '@chakra-ui/react';
import { FaUser, FaShoppingCart, FaCompass } from 'react-icons/fa';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import '../Cart/style.css';
import Auth from '../../utils/auth';
import { idbPromise } from '../../utils/helpers';
import { addMultipleToCart } from '../../utils/redux/freelancersSlice';

function Header() {
	const [isVisible, setIsVisible] = useState(true);
	const [opacity, setOpacity] = useState(1);
	let lastScrollY = window.scrollY;
	const [userName, setUserName] = useState('');
	const [showWelcome, setShowWelcome] = useState(true);
	const dispatch = useDispatch();
	const navigate = useNavigate(); // To redirect
	const toast = useToast(); // To show toasts
	// Access the cart state from Redux
	const cart = useSelector((state) => state.freelancers.cart);
	// Calculate total items in the cart
	const cartItemCount = cart.reduce(
		(total, item) => total + item.purchaseQuantity,
		0
	);
	console.log(cartItemCount);
	console.log(cart);

	useEffect(() => {
		async function getCart() {
			const cart = await idbPromise('cart', 'get');
			dispatch(addMultipleToCart([...cart]));
		}

		if (!cart.length) {
			getCart();
		}
	}, [cart.length, dispatch]);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			setOpacity(Math.max(0.5, 1 - currentScrollY / 200));

			if (currentScrollY > lastScrollY) {
				setIsVisible(false);
			} else {
				setIsVisible(true);
			}

			lastScrollY = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		if (Auth.loggedIn()) {
			const profile = Auth.getProfile();
			setUserName(profile.data.firstName);

			setShowWelcome(true);
			setTimeout(() => setShowWelcome(false), 5000);
		}
	}, []);
	// Function to handle profile link click
	const handleProfileClick = (e) => {
		// Prevent the default behavior of Link
		e.preventDefault();

		if (Auth.loggedIn()) {
			// If the user is logged in, navigate to the profile page
			navigate('/my-profile');
		} else {
			// If not logged in, show a toast message and navigate to login
			toast({
				title: 'Access Denied',
				description: 'Please log in to access your profile.',
				status: 'warning',
				duration: 3000,
				isClosable: true,
			});
			navigate('/');
		}
	};
	return (
		<Box
			as="header"
			position="fixed"
			top="0px"
			width="100%"
			bg="rgba(255, 255, 255, 0.1)"
			boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
			backdropFilter="blur(25px)"
			zIndex="1000"
			p={4}
			style={{
				backgroundColor: 'var(--primary)',
				opacity: isVisible ? opacity : 0,
				transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
				transition: 'transform 0.3s ease, opacity 0.3s ease',
			}}
		>
			<Flex justify="space-between" align="center">
				<Flex align="center" gap={4}>
					<Link
						to="/"
						style={{
							textDecoration: 'none',
						}}
					>
						<Text
							as="h1"
							style={{ color: 'var(--dark)' }}
							fontSize="2xl"
							fontWeight="bold"
						>
							Taskable
						</Text>
					</Link>
				</Flex>
				<Box flex="1" textAlign="center">
					{userName ? (
						<Text
							color="var(--dark)"
							fontSize="lg"
							fontWeight="medium"
							bg="#DEF2F1"
							px={4}
							py={2}
							borderRadius="md"
							backdropFilter="blur(10px)"
							transition="opacity 1s ease"
							opacity={showWelcome ? 1 : 0}
							display="inline-block"
							_hover={{
								bg: 'rgba(255, 255, 255, 0.3)',
								transform: 'translateY(-2px)',
							}}
						>
							🤩 Welcome,{' '}
							<Text as="span" color="green">
								{userName}
							</Text>
							! 🥳
						</Text>
					) : (
						<Box h="2rem" />
					)}
				</Box>

				<Flex
					display={{ base: 'none', md: 'flex' }}
					position="absolute"
					right="20px"
				>
					{/* Profile Icon */}
					<Box position="relative" display="inline-block" mx={5}>
						<Link
							to="/my-profile"
							className="icon-link"
							color="var(--dark)"
							onClick={handleProfileClick}
						>
							<FaUser />
						</Link>
					</Box>

					{/* Explore Icon */}
					<Box position="relative" display="inline-block" mx={5}>
						<Link
							to="/explore"
							className="icon-link"
							color="var(--dark)"
						>
							<FaCompass />
						</Link>
					</Box>

					{/* Shopping Cart Icon with Badge */}
					<Box position="relative" display="inline-block" mx={5}>
						<Link
							to="/checkout"
							className="icon-link"
							color="var(--dark)"
						>
							<FaShoppingCart />
							{cartItemCount > 0 && (
								<Badge
									colorScheme="red"
									borderRadius="full"
									position="absolute"
									top="25px"
									right="-5px"
									fontSize="0.6em"
									p={0.5}
									width="15px"
									height="15px"
									display="flex"
									alignItems="center"
									justifyContent="center"
									zIndex="1"
								>
									{cartItemCount}
								</Badge>
							)}
						</Link>
					</Box>
				</Flex>
				<Box display={{ base: 'flex', md: 'none' }}>
					<Menu>
						<MenuButton
							as={IconButton}
							icon={<HamburgerIcon />}
							variant="outline"
							aria-label="Options"
						/>
						<MenuList>
							<MenuItem>
								<Link
									to="/my-profile"
									color="var(--dark)"
									onClick={handleProfileClick}
								>
									My Profile
								</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/explore" color="var(--dark)">
									Explore
								</Link>
							</MenuItem>
							<MenuItem>
								<Link to="/checkout" color="var(--dark)">
									Cart
								</Link>
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			</Flex>
		</Box>
	);
}

export default Header;
