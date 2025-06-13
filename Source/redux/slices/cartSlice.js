import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { CART_BASE } from '../../api';


// In your cartSlice.js
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { getState }) => {
    const { auth } = getState();
    if (auth.token) {
       const response = await axios.get(`${CART_BASE}/getAllCartItems`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      return response.data.data; // Return the data array directly
    } else {
      const guestCart = await AsyncStorage.getItem('guestCart');
      return guestCart ? JSON.parse(guestCart) : [];
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item, { getState }) => {
    const { auth } = getState();
    const cartItem = {
      product: item.productId,
      variantId: item.variantId,
      qty: item.quantity,
      slabId: item.slabId,
      selectedPrice: item.price,
      isDigital: false
    };

    if (auth.token) {
      const response = await axios.post(`${CART_BASE}/addToCart`, cartItem, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      return response.data;
    } else {
      const guestCart = JSON.parse(await AsyncStorage.getItem('guestCart') || []);
      const existingItemIndex = guestCart.findIndex(
        i => i.product === cartItem.product && i.variantId === cartItem.variantId
      );
      
      if (existingItemIndex >= 0) {
        guestCart[existingItemIndex].qty += cartItem.qty;
      } else {
        guestCart.push(cartItem);
      }
      
      await AsyncStorage.setItem('guestCart', JSON.stringify(guestCart));
      return guestCart;
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, quantity }, { getState }) => {
    const { auth } = getState();
    
    if (auth.token) {
      const response = await axios.put(`${CART_BASE}/updateCartItemById/${itemId}`, { qty: quantity }, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      return response.data;
    } else {
      const guestCart = JSON.parse(await AsyncStorage.getItem('guestCart') || []);
      const itemIndex = guestCart.findIndex(i => i._id === itemId);
      
      if (itemIndex >= 0) {
        guestCart[itemIndex].qty = quantity;
        await AsyncStorage.setItem('guestCart', JSON.stringify(guestCart));
      }
      
      return guestCart;
    }
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId, { getState }) => {
    const { auth } = getState();
    
    if (auth.token) {
      await axios.delete(`${CART_BASE}/deleteCartItemById/${itemId}`, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      return itemId;
    } else {
      const guestCart = JSON.parse(await AsyncStorage.getItem('guestCart') || []);
      const updatedCart = guestCart.filter(i => i._id !== itemId);
      await AsyncStorage.setItem('guestCart', JSON.stringify(updatedCart));
      return itemId;
    }
  }
);

export const mergeGuestCart = createAsyncThunk(
  'cart/mergeGuestCart',
  async (_, { getState, dispatch }) => {
    const guestCart = JSON.parse(await AsyncStorage.getItem('guestCart') || []);
    
    if (guestCart.length > 0) {
      for (const item of guestCart) {
        await dispatch(addToCart(item));
      }
      await AsyncStorage.removeItem('guestCart');
    }
    
    return dispatch(fetchCartItems());
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
        state.items = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.items = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        state.lastUpdated = Date.now();
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;