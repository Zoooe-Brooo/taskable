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
    status: 'idle',
    error: null,
    notification: null
  },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.purchaseQuantity++;
      } else {
        state.cart.push({ ...action.payload });
      }
      state.cartOpen = true;
    },
    addMultipleToCart: (state, action) => {
      state.cart = [...action.payload];
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item._id !== action.payload._id);
      state.cartOpen = state.cart.length > 0;
    },
    toggleCart: (state) => {
      state.cartOpen = !state.cartOpen;
    },
    clearCart: (state) => {
      state.cart = [];
      state.cartOpen = false;
    },
    clearNotification: (state) => {
      state.notification = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFreelancers.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchFreelancers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.freelancers = action.payload;
        state.error = null;
      })
      .addCase(fetchFreelancers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  addToCart,
  addMultipleToCart,
  removeFromCart,
  toggleCart,
  clearCart,
  clearNotification
} = freelancersSlice.actions;

export default freelancersSlice.reducer;