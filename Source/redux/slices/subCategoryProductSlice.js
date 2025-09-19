// subCategoryProductSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import { FETCHPRODUCTBYSUBCATEGORY } from '../../api';

// AsyncThunk to fetch ALL products by subcategory (with dynamic pagination)
export const fetchProductsBySubcategory = createAsyncThunk(
  'product/fetchBySubcategory',
  async (subcategoryId, { rejectWithValue }) => {
    try {
      let allProducts = [];
      let page = 1;
      let hasMore = true;
      let limit = 100; // request 100 at a time (backend may support larger)

      while (hasMore) {
        // ✅ use query param instead of path param
        const response = await getData(
          `${FETCHPRODUCTBYSUBCATEGORY}${subcategoryId}&page=${page}&limit=${limit}`
        );

        const products = response?.data || [];
        const pagination = response?.pagination;

        if (products.length > 0) {
          allProducts = [...allProducts, ...products];
        }

        // Check pagination
        if (pagination?.totalPages && page < pagination.totalPages) {
          page++;
        } else {
          hasMore = false;
        }
      }

      return { subcategoryId, data: allProducts };
    } catch (error) {
      console.error("Error fetching products by subcategory:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  productsBySubcategory: {}, // keyed by subcategoryId
  loading: false,
  error: null,
};

const subCategoryProductSlice = createSlice({
  name: 'subCategoryProducts',
  initialState,
  reducers: {
    clearSubcategoryProducts: (state, action) => {
      if (action.payload) {
        // clear specific subcategory
        delete state.productsBySubcategory[action.payload];
      } else {
        // clear all
        state.productsBySubcategory = {};
      }
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsBySubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productsBySubcategory[action.payload.subcategoryId] =
          action.payload.data;
      })
      .addCase(fetchProductsBySubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSubcategoryProducts } = subCategoryProductSlice.actions;
export default subCategoryProductSlice.reducer;
