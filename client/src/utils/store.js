import { configureStore } from '@reduxjs/toolkit';
import freelancersReducer from '../utils/redux/freelancersSlice';

const store = configureStore({
  reducer: {
    freelancers: freelancersReducer,
  },
});

export default store;