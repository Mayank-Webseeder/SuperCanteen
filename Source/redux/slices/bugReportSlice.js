import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../api/index'
import axios from 'axios';


export const submitBugReport = createAsyncThunk(
  'bugReport/submitBugReport',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
      `${BASE_URL}/bug-report/submitBugReport`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (err) {
      console.error('Error submitting bug report:', err);
      return rejectWithValue(err.response?.data || 'Failed to submit bug report');
    }
  }
);

const bugReportSlice = createSlice({
  name: 'bugReport',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetBugReportStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitBugReport.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
     .addCase(submitBugReport.fulfilled, (state, action) => {
      console.log("Bug report submitted", action.payload);
      state.loading = false;
       state.success = true;
        })
      .addCase(submitBugReport.rejected, (state, action) => {
        console.log("Bug report failed",action.payload)
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBugReportStatus } = bugReportSlice.actions;
export default bugReportSlice.reducer;