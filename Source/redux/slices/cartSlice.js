import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { CART_BASE } from '../../api';

export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { getState }) => {
    const { auth } = getState();
    if (!auth.token) throw new Error("User not authenticated");
    const response = await axios.get(`${CART_BASE}/getAllCartItems`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data.data; // assuming it's an array
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item, { getState, dispatch }) => {
    const { auth } = getState();
    if (!auth.token) throw new Error("User not authenticated");

    const cartItem = {
      product: item.productId,
      qty: item.quantity,
      selectedPrice: item.price,
      isDigital: item.isDigital || false
    };

    const response = await axios.post(`${CART_BASE}/addToCart`, cartItem, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });

    await dispatch(fetchCartItems());
    return response.data.data;
  }
);


export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, payload }, { getState }) => {
    
    const { auth } = getState();
    if (!auth.token) throw new Error("User not authenticated");

    const response = await axios.put(
      `${CART_BASE}/updateCartItemById/${itemId}`,
      payload, // Use the payload directly
      {
        headers: { Authorization: `Bearer ${auth.token}` }
      }
    );

    console.log("RESPONSE IS==============>",response)

    return {
      updatedItemId: itemId,
      updatedItem: response.data.data
    };
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId, { getState, dispatch }) => {
    const { auth } = getState();
    if (!auth.token) throw new Error("User not authenticated");

    await axios.delete(`${CART_BASE}/deleteCartItemById/${itemId}`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });

    const response = await dispatch(fetchCartItems());
    return response.payload;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
    lastUpdated: null
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.lastUpdated = Date.now();
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.lastUpdated = Date.now();
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        console.log("FULLEIFLD IS==============>",action.payload)
        state.loading = false;
        const index = state.items.findIndex(
          item => item._id === action.payload.updatedItemId
        );
        
        if (index !== -1) {
          // Update the specific item with new data from server
          state.items[index] = {
            ...state.items[index],
            ...action.payload.updatedItem
          };
        }
        state.lastUpdated = Date.now();
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        console.log("ERROR IS==========>",action.error)
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.lastUpdated = Date.now();
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
