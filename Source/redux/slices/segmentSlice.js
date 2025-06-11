// redux/slices/segmentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GETPRODUCTBYSEGMENT } from '../../api';
import { getData } from '../../utils/apiClient';

export const fetchGetSegmentsByCategory = createAsyncThunk(
  'segments/getByCategory',
  async (subCategoryId, { rejectWithValue }) => {
    try {
      const data = await getData(`${GETPRODUCTBYSEGMENT}${subCategoryId}`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const segmentSlice = createSlice({
  name: 'segments',
  initialState: {
    segmentsByCategory: {},
    loading: false,
    error: null,
    currentCategory: null
  },
  reducers: {
    clearProducts: (state) => {
      state.segmentsByCategory = {};
      state.currentCategory = null;
    }
  },
  extraReducers: (builder) => {
    builder
       .addCase(fetchGetSegmentsByCategory.pending, (state) => {
              state.loading = true;
              state.error = null;
            })
            .addCase(fetchGetSegmentsByCategory.fulfilled, (state, action) => {
              state.loading = false;
              state.segmentsByCategory = action.payload;
            })
            .addCase(fetchGetSegmentsByCategory.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload;
            });
  }
});

export const { clearProducts } = segmentSlice.actions;
export default segmentSlice.reducer;