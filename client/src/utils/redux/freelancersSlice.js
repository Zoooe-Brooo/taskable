import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { QUERY_FREELANCERS } from '../queries';

// Apollo Client
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

// Async action to fetch freelancers
export const fetchFreelancers = createAsyncThunk(
  'freelancers/fetchFreelancers',
  async () => {
    try {
      const { data } = await client.query({ query: QUERY_FREELANCERS });
      return data.freelancers; // Return fetched freelancers
    } catch (error) {
      console.error('Error fetching freelancers:', error);
      throw error;
    }
  }
);

const freelancersSlice = createSlice({
  name: 'freelancers',
  initialState: {
    freelancers: [],
    cart: [],
    cartOpen: false,
    status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartOpen = true;
      state.cart.push(action.payload); // Add freelancer to cart
    },
    addMultipleToCart: (state, action) => {
      state.cart.push(...action.payload); // Add multiple freelancers to cart
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(freelancer => freelancer._id !== action.payload._id);
      state.cartOpen = state.cart.length > 0; // Check if the cart is empty
    },
    clearCart: (state) => {
      state.cart = []; // Clear the cart
      state.cartOpen = false; // Close the cart
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFreelancers.pending, (state) => {
        state.status = 'loading'; // Loading freelancers
      })
      .addCase(fetchFreelancers.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Successfully fetched freelancers
        state.freelancers = action.payload; // Store freelancers in state
      })
      .addCase(fetchFreelancers.rejected, (state) => {
        state.status = 'failed'; // Failed to fetch freelancers
      });
  },
});

export const { addToCart, addMultipleToCart, removeFromCart, clearCart } = freelancersSlice.actions;

export default freelancersSlice.reducer;