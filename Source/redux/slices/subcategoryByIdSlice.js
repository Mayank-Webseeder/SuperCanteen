// redux/slices/subcategorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';

export const fetchSubcategoriesByCategory = createAsyncThunk(
  'subcategory/fetchByCategory',
  async (categoryId, thunkAPI) => {
    try {
      const response = await getData(`/subcategories/readSubCategoryById/${categoryId}`);
      return { categoryId, data: response };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: {
    subcategoriesByCategory: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategoriesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubcategoriesByCategory.fulfilled, (state, action) => {
        const { categoryId, data } = action.payload;
        state.loading = false;
        state.subcategoriesByCategory[categoryId] = data;
      })
      .addCase(fetchSubcategoriesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subcategorySlice.reducer;
