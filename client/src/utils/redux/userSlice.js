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

// // Load favorites from localStorage on initialization
// const loadFavorites = () => {
//   try {
//     const savedFavorites = localStorage.getItem('favoriteServices');
//     return savedFavorites ? JSON.parse(savedFavorites) : [];
//   } catch (error) {
//     console.error('Error loading favorites:', error);
//     return [];
//   }
// };

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    isAuthenticated: false,
    status: 'idle',
    error: null,
    // favoriteServices: loadFavorites(),
    // currentJobs: [
    //   {
    //     service: "Website Development",
    //     provider: "John Smith",
    //     progress: 75,
    //     startDate: "2024-03-01",
    //     estimatedCompletion: "2024-03-30"
    //   },
    //   {
    //     service: "Mobile App Design",
    //     provider: "Sarah Johnson",
    //     progress: 30,
    //     startDate: "2024-03-10",
    //     estimatedCompletion: "2024-04-15"
    //   },
    //   {
    //     service: "Database Optimization",
    //     provider: "Mike Wilson",
    //     progress: 90,
    //     startDate: "2024-02-15",
    //     estimatedCompletion: "2024-03-20"
    //   }
    // ],
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
    // setFavoriteServices: (state, action) => {
    //   state.favoriteServices = action.payload;
    // },
    // addFavoriteService: (state, action) => {
    //   const exists = state.favoriteServices.some(
    //     service => service._id === action.payload._id
    //   );
    //   if (!exists) {
    //     const newFavorite = {
    //       ...action.payload,
    //       image: `/images/profile-pics/${action.payload.name.split(' ')[0].toLowerCase()}.png`,
    //       provider: action.payload.name
    //     };
    //     console.log('Adding new favorite:', newFavorite);
    //     state.favoriteServices.push(newFavorite);
    //     localStorage.setItem('favoriteServices', JSON.stringify(state.favoriteServices));
    //     console.log('Updated favorites in localStorage:', localStorage.getItem('favoriteServices'));
    //   }
    // },
    // removeFavoriteService: (state, action) => {
    //   state.favoriteServices = state.favoriteServices.filter(
    //     service => service._id !== action.payload._id
    //   );
    //   // Update localStorage
    //   localStorage.setItem('favoriteServices', JSON.stringify(state.favoriteServices));
    // }
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

export const { setUserData, clearUserData } = userSlice.actions;
// export const { addFavoriteService, removeFavoriteService, setFavoriteServices } = userSlice.actions;
export default userSlice.reducer;