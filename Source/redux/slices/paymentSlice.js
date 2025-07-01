import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postData , getData} from "../../utils/apiClient";
import { CREATE_ORDER , GET_RAZORPAY_KEY} from "../../api";

export const createOrder = createAsyncThunk(
  'payment/createOrder',
 async (orderData , { rejectWithValue }) => {
    try {
      const response = await postData(CREATE_ORDER, orderData);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.message || 'Failed to add to wishlist');
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

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    razorpayKey: '',
    orderId: null,
    loading: false,
    error: null
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
      // Create Order
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
      });
  }
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;