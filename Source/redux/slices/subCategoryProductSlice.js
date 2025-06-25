// subCategoryProductSlice.js (new file)
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import { FETCHPRODUCTBYSUBCATEGORY } from '../../api';

export const fetchProductsBySubcategory = createAsyncThunk(
  'product/fetchBySubcategory',
  async (subcategoryId, thunkAPI) => {
    try {
      const data = await getData(`${FETCHPRODUCTBYSUBCATEGORY}/${subcategoryId}`);
      return { subcategoryId, data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  productsBySubcategory: {},
  loading: false,
  error: null,
};

const subCategoryProductSlice = createSlice({
  name: 'subCategoryProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsBySubcategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsBySubcategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productsBySubcategory[action.payload.subcategoryId] = action.payload.data;
        // console.log("FETCH PRODUCTSBY SUBCATEGORY",action.payload)
      })
      .addCase(fetchProductsBySubcategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subCategoryProductSlice.reducer;