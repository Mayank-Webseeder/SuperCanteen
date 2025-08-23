// redux/slices/allProducts.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import { ALLPRODUCTS } from '../../api';

export const getAllProducts = createAsyncThunk(
  'allProducts/getAll',
  async ({ page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const url = `${ALLPRODUCTS}&page=${page}&limit=${limit}`;
      const res = await getData(url);
      return { products: res.data, pagination: res.pagination };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
const productSlice = createSlice({
  name: 'allProducts',
  initialState: {
    items: [],
    page: 1,
    limit: 20,
    pagination: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetProducts: (state) => {
      state.items = [];
      state.page = 1;
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
  state.loading = false;
  const { products, pagination } = action.payload;

  if (pagination.currentPage === 1) {
    state.items = products;
  } else {
    state.items = [...state.items, ...products];
  }

  state.pagination = pagination;
  state.page = pagination.currentPage;
})


      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetProducts } = productSlice.actions;
export default productSlice.reducer;
