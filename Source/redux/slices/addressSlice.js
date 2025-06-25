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
      const payload = { addresses: [address] };
      const response = await postData(`${ADD_MULTIPLE_ADDRESS}/${userId}`, payload);
      return response.addresses[0]; // assuming API returns added address
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
      await deleteData(`${DELETE_ADDRESS_BY_USERID}/${userId}/address/${addressId}`);
      return addressId;
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
      const response = await putData(`${UPDATE_ADDRESS_BY_USERID}/${userId}/address/${addressId}`, updatedAddress);
      return { addressId, updatedAddress };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Something went wrong');
    }
  }
);

// ✅ Slice
const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
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
      // Add
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Address added successfully';
        state.addresses.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
  state.loading = false;
  state.success = 'Address deleted successfully';

  // ✅ Remove the address from the local array
  const deletedId = action.meta.arg.addressId;
  state.addresses = state.addresses.filter(addr => addr._id !== deletedId);
})
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Address updated successfully';
        const index = state.addresses.findIndex(addr => addr._id === action.payload.addressId);
        if (index !== -1) {
          state.addresses[index] = { _id: action.payload.addressId, ...action.payload.updatedAddress };
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAddressStatus } = addressSlice.actions;
export default addressSlice.reducer;
