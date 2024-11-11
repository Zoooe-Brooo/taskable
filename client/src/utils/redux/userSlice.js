import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { QUERY_USER } from '../queries';
import { client } from '../apollo';
import Auth from '../auth';

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = Auth.getToken();
      if (!token) {
        throw new Error('No token found');
      }

      const { data } = await client.query({
        query: QUERY_USER,
        context: {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      });
      
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Load favorites from localStorage on initialization
const loadFavorites = () => {
  try {
    const savedFavorites = localStorage.getItem('favoriteServices');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
    favoriteServices: loadFavorites(),
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    clearUserData: (state) => {
      state.data = null;
      state.isAuthenticated = false;
    },
    addFavorite: (state, action) => {
      state.favoriteServices.push(action.payload);
      localStorage.setItem('favoriteServices', JSON.stringify(state.favoriteServices));
    },
    removeFavorite: (state, action) => {
      state.favoriteServices = state.favoriteServices.filter(
        service => service._id !== action.payload._id
      );
      localStorage.setItem('favoriteServices', JSON.stringify(state.favoriteServices));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const { setUserData, clearUserData, addFavorite, removeFavorite } = userSlice.actions;
export default userSlice.reducer;