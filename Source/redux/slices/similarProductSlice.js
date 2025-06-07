import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';

export const fetchProductById = createAsyncThunk(
  'productDetail/fetchById',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await getData(`/products/${productId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSimilarProducts = createAsyncThunk(
  'productDetail/fetchSimilar',
  async ({ categoryId, excludeProductId }, { rejectWithValue }) => {
    try {
      const data = await getData(
        `/products/allProducts?category=${categoryId}&exclude=${excludeProductId}&limit=8`
      );
      return data.data; // Return only the products array
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const similarProductSlice = createSlice({
  name: 'similarProduct',
  initialState: {
    product: null,
    loading: false,
    error: null,
    similarProducts: [],
    similarLoading: false,
    similarError: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Product details
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Similar products
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.similarLoading = true;
        state.similarError = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.similarLoading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.similarLoading = false;
        state.similarError = action.payload;
      });
  }
});

export default similarProductSlice.reducer;