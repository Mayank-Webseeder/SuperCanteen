import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient'; // adjust path as needed
import {GET_PRODUCT_BY_SEGMENT} from '../../api'


// AsyncThunk to fetch segmentProducts by segment ID
export const fetchProductsBySegment = createAsyncThunk(
  'productsBySegment/fetch',
  async (segmentId, { rejectWithValue }) => {
    try {
      const response = await getData(`${GET_PRODUCT_BY_SEGMENT}${segmentId}`);
      return response; // assuming it's an array of segmentProducts
    } catch (error) {
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
    currentSegmentId: null
  },
  reducers: {
    clearSegmentProducts: (state) => {
      state.segmentProducts = [];
      state.currentSegmentId = null;
      state.error = null;
    }
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
        console.log("FULLFIELLDE DATA IS",action.payload)
      })
      .addCase(fetchProductsBySegment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("REJECTED IS",action.payload)
      });
  }
});

export const { clearSegmentProducts } = productBySegmentSlice.actions;
export default productBySegmentSlice.reducer;
