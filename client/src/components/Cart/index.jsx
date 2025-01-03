import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useDispatch, useSelector } from 'react-redux';
import { addMultipleToCart, toggleCart } from '../../utils/redux/freelancersSlice';
import './style.css';
import {
  Button,
  VStack,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Badge,
  Flex,
  Icon,
  Divider
} from '@chakra-ui/react';
import { FaShoppingCart } from 'react-icons/fa';

const stripePromise = loadStripe('pk_test_L1f0e3XAzjsG7jtp4uN7L9ql');

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.freelancers.cart);
  const cartOpen = useSelector((state) => state.freelancers.cartOpen);
  const [getCheckout, { data, error }] = useLazyQuery(QUERY_CHECKOUT);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (error) {
      console.error('Error with checkout:', error);
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

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
    setTotalItems(cart.reduce((total, item) => total + item.purchaseQuantity, 0));
  }, [cart]);

  const handleToggleCart = () => {
    dispatch(toggleCart());
  };

  function calculateTotal() {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
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

  return (
    <>
      <Button
        position="fixed"
        right={4}
        top={20}
        onClick={handleToggleCart}
        colorScheme="teal"
        borderRadius="full"
        p={3}
      >
        <Icon as={FaShoppingCart} boxSize={6} />
        {totalItems > 0 && (
          <Badge
            position="absolute"
            top="-2"
            right="-2"
            colorScheme="red"
            borderRadius="full"
          >
            {totalItems}
          </Badge>
        )}
      </Button>

      <Drawer
        isOpen={cartOpen}
        placement="right"
        onClose={handleToggleCart}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Shopping Cart</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch">
              {cart.length ? (
                <>
                  {cart.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                  <Divider />
                  <Flex justify="space-between" align="center" p={4}>
                    <Text fontWeight="bold">Total: ${calculateTotal()}</Text>
                    {Auth.loggedIn() ? (
                      <Button colorScheme="teal" onClick={submitCheckout}>
                        Checkout
                      </Button>
                    ) : (
                      <Text color="gray.500">(log in to check out)</Text>
                    )}
                  </Flex>
                </>
              ) : (
                <Text textAlign="center" color="gray.500">
                  Your cart is empty 😱
                </Text>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Cart;
