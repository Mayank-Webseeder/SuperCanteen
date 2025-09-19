// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import {  PRODUCTBYCATEGORY } from '../../api';


export const getProductsByCategory = createAsyncThunk(
  'products/getByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const data = await getData(`${PRODUCTBYCATEGORY}${categoryId}`);
      console.log("data is",data)
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
    currentCategory: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.data;
        state.currentCategory = action.meta.arg;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  }
});

export default productSlice.reducer;