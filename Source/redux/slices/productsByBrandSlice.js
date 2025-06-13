// redux/slices/productsByBrandSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import { formatProductsByBrand } from '../../utils/dataFormatters';
import { GET_PRODUCT_BY_BRAND } from '../../api'

export const fetchProductsByBrand = createAsyncThunk(
  'productsByBrand/fetch',
  async (brandId, { rejectWithValue }) => {
    try {
      const response = await getData(`${GET_PRODUCT_BY_BRAND}${brandId}`);
      const products = response?.data; 
      const formatted = formatProductsByBrand(products);
      return {
        products: formatted,
        pagination: response?.data?.data?.pagination || {}
      };

    } catch (error) {
        console.log("ERROR IS",error)
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const productsByBrandSlice = createSlice({
  name: 'productsByBrand',
  initialState: {
    brandProducts: [],
    loading: false,
    error: null,
    pagination: {}
  },
  reducers: {
    clearBrandProducts: (state) => {
      state.brandProducts = [];
      state.error = null;
      state.pagination = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByBrand.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.brandProducts = action.payload.products;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchProductsByBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearBrandProducts } = productsByBrandSlice.actions;
export default productsByBrandSlice.reducer;
