import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import { GET_ALL_COUPONS } from '../../api';

export const getAllCoupons = createAsyncThunk(
  'coupon/getAllCoupons',
  async (_, thunkAPI) => {
    try {
      const data = await getData(GET_ALL_COUPONS);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  coupons: [],
  appliedCoupons: {},
  loading: false,
  error: null,
};

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    applyCoupon: (state, action) => {
      const { productId, coupon } = action.payload;
      state.appliedCoupons[productId] = coupon;
    },
    removeCoupon: (state, action) => {
      const { productId } = action.payload;
      delete state.appliedCoupons[productId];
    },
      clearAllCoupons: (state) => {
      state.appliedCoupons = {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload; 
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { applyCoupon, removeCoupon ,  clearAllCoupons } = couponSlice.actions;
export default couponSlice.reducer;