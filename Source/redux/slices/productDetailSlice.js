import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import { PRODUCTBYID } from '../../api';

export const fetchProductById = createAsyncThunk(
  'productDetail/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await getData(`${PRODUCTBYID}/${productId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState: {
    product: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  }
});

export default productDetailSlice.reducer;