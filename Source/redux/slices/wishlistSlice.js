import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, deleteData, getData } from '../../utils/apiClient'; 
import { 
  ADD_TO_WISHLIST, 
  REMOVE_FROM_WISHLIST 
} from '../../api';

// Fetch wishlist
export const fetchWishlistItems = createAsyncThunk(
  'wishlist/fetchWishlistItems',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getData(
        `${GET_WHISHLIST_BY_USERID}/${userId}`
);

      return response.data.wishlist.products;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);
// Add to wishlist
export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ productId, token }, { rejectWithValue }) => {
    try {
      const response = await postData(
        ADD_TO_WISHLIST,
        { productId },
        token
      );

      return response.wishlist.products;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to add to wishlist');
    }
  }
);

// Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ userId, productId, token }, { rejectWithValue }) => {
    try {
      const url = `${REMOVE_FROM_WISHLIST}/${userId}/product/${productId}`;
      const response = await deleteData(url, token);
      
      return response.wishlist.products;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to remove from wishlist');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(removeFromWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchWishlistItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;


