// redux/slices/selectedAddressSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedAddress: null,
};

const selectedAddressSlice = createSlice({
  name: 'selectedAddress',
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    clearSelectedAddress: (state) => {
      state.selectedAddress = null;
    },
  },
});

export const { setSelectedAddress, clearSelectedAddress } = selectedAddressSlice.actions;

// Selector to get the selected address
export const selectSelectedAddress = (state) => state.selectedAddress.selectedAddress;

export default selectedAddressSlice.reducer;