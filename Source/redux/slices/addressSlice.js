import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, deleteData, putData } from '../../utils/apiClient';
import {
  ADD_MULTIPLE_ADDRESS,
  DELETE_ADDRESS_BY_USERID,
  UPDATE_ADDRESS_BY_USERID,
} from '../../api';

// ✅ Add Address
export const addAddress = createAsyncThunk(
  'address/addAddress',
  async ({ userId, address }, { rejectWithValue }) => {
    try {
      const payload = {
        addresses: [address], // wrap in array
      };
      const response = await postData(`${ADD_MULTIPLE_ADDRESS}/${userId}`, payload);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);


// ✅ Delete Address
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const data = await deleteData(`${DELETE_ADDRESS_BY_USERID}/${userId}/address/${addressId}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// ✅ Update Address
export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ userId, addressId, updatedAddress }, { rejectWithValue }) => {
    try {
      const endpoint = `${UPDATE_ADDRESS_BY_USERID}/${userId}/address/${addressId}`;
      const response = await putData(endpoint, updatedAddress); // no wrapping needed
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);





// ✅ Slice
const addressSlice = createSlice({
  name: 'address',
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearAddressStatus: (state) => {
      state.success = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Add Address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Address added successfully';
      })
      .addCase(addAddress.rejected, (state, action) => {
        console.log("REJECTED ADDRESS IS",action.payload)
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Address deleted successfully';
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state) => {
        state.loading = false;
        state.success = 'Address updated successfully';
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAddressStatus } = addressSlice.actions;
export default addressSlice.reducer;
