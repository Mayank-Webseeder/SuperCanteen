import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData } from "../../utils/apiClient";
import { CONTACT_US } from "../../api";

export const createContactUs = createAsyncThunk(
  'contactUs/create',
  async (messageData, { rejectWithValue }) => {
    try {
      const response = await postData(CONTACT_US, messageData)
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Message submission failed');
    }
  }
);

const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState: {
    loading: false,
    error: null,
    isSubmitted: false,
    message: ''
  },
  reducers: {
    resetContactUsState: (state) => {
      state.loading = false;
      error: null;
      isSubmitted: false;
      message: '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createContactUs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isSubmitted = false;
      })
      .addCase(createContactUs.fulfilled, (state, action) => {
        state.loading = false;
        state.isSubmitted = true;
        state.message = action.payload?.message
      })
      .addCase(createContactUs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSubmitted = false;
      });
  }
});

export const { resetContactUsState } = contactUsSlice.actions;
export default contactUsSlice.reducer;