import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import {  GETALLSUBCATEGORIES } from '../../api';

export const getSubCategories = createAsyncThunk(
  'subCategory/getAll',
  async (_, thunkAPI) => {
    try {
      const data = await getData(GETALLSUBCATEGORIES);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  subCategories: [],
  loading: false,
  error: null,
};

const subCategorySlice = createSlice({
  name: 'subCategory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategories = action.payload; 
      })
      .addCase(getSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ;
      });
  },
});

export default subCategorySlice.reducer;
