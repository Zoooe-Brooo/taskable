import { configureStore } from '@reduxjs/toolkit';
import freelancersReducer from './redux/freelancersSlice';
import userReducer from './redux/userSlice';

const store = configureStore({
  reducer: {
    freelancers: freelancersReducer,
    user: userReducer
  }
});

export default store;