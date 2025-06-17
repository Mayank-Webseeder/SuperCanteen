// redux/slices/wishlistSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData } from '../../utils/apiClient'; // Ensure this handles POST requests

// Async thunk to add product to wishlist
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState(); // assuming auth contains token/user info
      const token = auth?.user?.token;

      const response = await postData(
        'https://super-canteen-backend.onrender.com/api/wishlist/addToWishlist',
        { productId },
        token
      );

      return response; // return the wishlist data or success message
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to add to wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload?.wishlist || []; // optional: update your wishlist
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
