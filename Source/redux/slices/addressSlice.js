import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData, postData, deleteData, putData } from '../../utils/apiClient';

// Fetch all addresses for user
export const fetchUserAddresses = createAsyncThunk(
  'address/fetchUserAddresses',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await getData('/users/get-userProfileAddress');
      return response.addresses || [];
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to fetch addresses');
    }
  }
);

// Add new address
export const addAddress = createAsyncThunk(
  'address/addAddress',
  async ({ userId, address }, { rejectWithValue }) => {
    try {
      const response = await postData(
        `/users/add-Addresses/${userId}`,
        { addresses: [address] }
      );
      return response.addresses[0];
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to add address');
    }
  }
);

// Update existing address
export const updateAddress = createAsyncThunk(
  'address/updateAddress',
  async ({ userId, addressId, updatedAddress }, { rejectWithValue }) => {
    try {
      const response = await putData(
        `/users/update-AddressByUserId/${userId}/address/${addressId}`,
        updatedAddress
      );
      return { addressId, updatedAddress: response.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to update address');
    }
  }
);

// Delete address
export const deleteAddress = createAsyncThunk(
  'address/deleteAddress',
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      await deleteData(
        `/users/delete-AddressByUserId/${userId}/address/${addressId}`
      );
      return addressId;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to delete address');
    }
  }
);

export const setDefaultAddress = createAsyncThunk(
  'address/setDefaultAddress',
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      const response = await postData(
        `/users/set-default-address/${userId}`,
        { addressId }
      );
      return addressId;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'Failed to set default address');
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: [],
    loading: false,
    error: null,
    success: null
  },
  reducers: {
    clearAddressStatus: (state) => {
      state.error = null;
      state.success = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch addresses
      .addCase(fetchUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload;
      })
      .addCase(fetchUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Add address
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
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
      
      // Update address
      .addCase(updateAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Address updated successfully';
        const index = state.addresses.findIndex(addr => addr._id === action.payload.addressId);
        if (index !== -1) {
          state.addresses[index] = action.payload.updatedAddress;
        }
      })
      .addCase(updateAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete address
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = 'Address deleted successfully';
        state.addresses = state.addresses.filter(addr => addr._id !== action.payload);
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // In addressSlice.js - fix the extra }) in setDefaultAddress case
.addCase(setDefaultAddress.fulfilled, (state, action) => {
  const defaultId = action.payload;
  state.addresses = state.addresses.map(addr => ({
    ...addr,
    isDefault: addr._id === defaultId
  }));
})
.addCase(setDefaultAddress.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})
  }
});

export const { clearAddressStatus } = addressSlice.actions;
export default addressSlice.reducer;