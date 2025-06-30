import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import { GET_ALL_SECTIONS } from '../../api'

export const fetchSections = createAsyncThunk(
  'section/fetchSections',
  async (_, thunkAPI) => {
    try {
      const res = await getData(GET_ALL_SECTIONS);
      return res.data;  // array of sections
    } catch (err) {
      console.log("EEROR IS",err)
      return thunkAPI.rejectWithValue(err.message || 'Failed to load sections');
    }
  }
);

const sectionSlice = createSlice({
  name: 'section',
  initialState: {
    sections: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSections.pending, state => {
        state.loading = true;
        state.error = null;
      })
     .addCase(fetchSections.fulfilled, (state, action) => {
        state.loading = false;
        state.sections = action.payload;
      })
    .addCase(fetchSections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default sectionSlice.reducer;
