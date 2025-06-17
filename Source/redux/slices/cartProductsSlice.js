// redux/slices/cartProductsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import { PRODUCTBYID } from '../../api';

export const fetchCartProductById = createAsyncThunk(
  'cartProducts/fetchCartProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await getData(`${PRODUCTBYID}/${productId}`);
      return { productId, product: data.product || data };
    } catch (err) {
      return rejectWithValue({ productId, error: err.response?.data || 'Error fetching product' });
    }
  }
);

const cartProductsSlice = createSlice({
  name: 'cartProducts',
  initialState: {
    products: {},
    loading: {},
    errors: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProductById.pending, (state, action) => {
        const productId = action.meta.arg;
        state.loading[productId] = true;
        state.errors[productId] = null;
      })
      .addCase(fetchCartProductById.fulfilled, (state, action) => {
        const { productId, product } = action.payload;
        state.products[productId] = product;
        state.loading[productId] = false;
        state.errors[productId] = null;
      })
      .addCase(fetchCartProductById.rejected, (state, action) => {
        const { productId, error } = action.payload;
        state.loading[productId] = false;
        state.errors[productId] = error;
      });
  },
});

export default cartProductsSlice.reducer;