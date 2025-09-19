import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient'; 
import { GET_PRODUCT_BY_SEGMENT } from '../../api';

// AsyncThunk to fetch ALL products by segment ID (dynamic pagination)
export const fetchProductsBySegment = createAsyncThunk(
  'productsBySegment/fetch',
  async (segmentId, { rejectWithValue }) => {
    try {
      let allProducts = [];
      let page = 1;
      let hasMore = true;
      let limit = 50; // start with a safe default
      let totalPages = 1;

      while (hasMore) {
        const response = await getData(
          `${GET_PRODUCT_BY_SEGMENT}${segmentId}&page=${page}&limit=${limit}`
        );

        const products = response?.data || [];
        const pagination = response?.pagination;

        // Add products if available
        if (products.length > 0) {
          allProducts = [...allProducts, ...products];
        }

        // Update totalPages from backend (dynamic)
        if (pagination?.totalPages) {
          totalPages = pagination.totalPages;
          limit = pagination?.limit || limit; // use backend-provided limit if available
        }

        page++;
        hasMore = page <= totalPages;
      }

      return allProducts;
    } catch (error) {
      console.error("Error fetching products by segment:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const productBySegmentSlice = createSlice({
  name: 'productsBySegment',
  initialState: {
    segmentProducts: [],
    loading: false,
    error: null,
    currentSegmentId: null,
  },
  reducers: {
    clearSegmentProducts: (state) => {
      state.segmentProducts = [];
      state.currentSegmentId = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsBySegment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySegment.fulfilled, (state, action) => {
        state.loading = false;
        state.segmentProducts = action.payload;
      })
      .addCase(fetchProductsBySegment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSegmentProducts } = productBySegmentSlice.actions;
export default productBySegmentSlice.reducer;
