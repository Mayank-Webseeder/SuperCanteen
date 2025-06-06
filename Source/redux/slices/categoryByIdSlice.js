import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';


export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchByCategory',
  async (categoryId, thunkAPI) => {
    try {
     const data = await getData(`/category/readCategoriesById/${categoryId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  productsByCategory: {}, 
  loading: false,
  error: null,
};

const categoryByIdSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const categoryId = action.meta.arg; 
        state.loading = false;
        state.productsByCategory[categoryId] = action.payload?.data || []; 
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default categoryByIdSlice.reducer;
