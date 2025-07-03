import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData , getData} from "../../utils/apiClient";
import { CREATE_ORDER , GET_RAZORPAY_KEY,VERIFY_PAYMENT} from "../../api";

export const createOrder = createAsyncThunk(
  'payment/createOrder',
 async (orderData , { rejectWithValue }) => {
    try {
      const response = await postData(CREATE_ORDER, orderData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  }
);
export const getRazorpayKey = createAsyncThunk(
  'payment/getKey',
  async (_, { rejectWithValue }) => {
    try {
    const response = await getData(GET_RAZORPAY_KEY);
    console.log("API raw response is:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.message || error.message || 'Failed to get Razorpay key');
    }
  }
);


export const verifyPayment = createAsyncThunk(
  'payment/verify',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await postData(VERIFY_PAYMENT, paymentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message || 'Payment verification failed');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
  razorpayKey: '',
  orderId: null,
  loading: false,
  error: null,
  verificationLoading: false,
  verificationError: null,
  isVerified: false
  },
  reducers: {
    clearPaymentState: (state) => {
      state.razorpayKey = '';
      state.orderId = null;
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
  .addCase(createOrder.fulfilled, (state, action) => {
  state.loading = false;
  state.orderId = action.payload?.RazorpayOrderId;
})
.addCase(createOrder.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
  
})
.addCase(getRazorpayKey.fulfilled, (state, action) => {
  state.loading = false;
  state.razorpayKey = action.payload?.key || '';
  console.log("✅ Razorpay Key from backend:", action.payload);
})   
.addCase(getRazorpayKey.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
    console.log("rejected is",action.payload)
      })
  .addCase(verifyPayment.pending, (state) => {
    state.verificationLoading = true;
    state.verificationError = null;
    state.isVerified = false;
  })
  .addCase(verifyPayment.fulfilled, (state, action) => {
    state.verificationLoading = false;
    state.isVerified = true;
    console.log("VERIFIED PAYMENT IS",action.payload)
  })
  .addCase(verifyPayment.rejected, (state, action) => {
    state.verificationLoading = false;
    state.verificationError = action.payload;
    state.isVerified = false;
    console.log("OAYMENT REJECTED IS",action.payload)
  });
  }
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;