import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GET_ORDER_BY_USERID , GET_ORDER_BY_ID } from '../../api';
import { getData } from '../../utils/apiClient'

// In your orderSlice.js
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async ({ userId, page = 1, status = [], timeRange = '', search = '' }, { rejectWithValue }) => {
    try {
      // Build query params
      const params = new URLSearchParams();
      params.append('page', page);
      
      if (status.length > 0) {
        params.append('status', status.join(','));
      }
      
      if (timeRange) {
        params.append('timeRange', timeRange);
      }
      
      if (search) {
        params.append('search', search);
      }

      const response = await getData(
        `${GET_ORDER_BY_USERID}/${userId}?${params.toString()}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response =  await getData(
        `${GET_ORDER_BY_ID}/${orderId}`
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserOrders.pending, (state, action) => {
        state.loading = action.meta.arg.page === 1;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        if (action.meta.arg.page === 1) {
          // First page - replace all orders
          state.orders = action.payload.data;
        } else {
          // Subsequent pages - append to existing orders
          state.orders = [...state.orders, ...action.payload.data];
        }
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload.order;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;


