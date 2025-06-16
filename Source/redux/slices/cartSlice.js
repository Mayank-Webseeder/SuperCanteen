import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CART_BASE } from '../../api';

// AsyncStorage helper functions
const GUEST_CART_KEY = 'guestCart';

export const loadGuestCart = async () => {
  try {
    const cart = await AsyncStorage.getItem(GUEST_CART_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error loading guest cart:', error);
    return [];
  }
};

const saveGuestCart = async (cartItems) => {
  try {
    await AsyncStorage.setItem(GUEST_CART_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error saving guest cart:', error);
  }
};

const clearGuestCart = async () => {
  try {
    await AsyncStorage.removeItem(GUEST_CART_KEY);
  } catch (error) {
    console.error('Error clearing guest cart:', error);
  }
};

// Helper to generate temporary IDs for guest cart items
const generateTempId = () => `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Async Thunks
export const fetchCartItems = createAsyncThunk(
  'cart/fetchCartItems',
  async (_, { getState }) => {
    const { auth } = getState();
    if (!auth.token) {
      return await loadGuestCart();
    }
    
    const response = await axios.get(`${CART_BASE}/getAllCartItems`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data.data;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (item, { getState }) => {
    const { auth } = getState();
    const cartItem = {
      product: item.productId,
      qty: item.quantity,
      selectedPrice: item.price,
      isDigital: item.isDigital || false,
    };

    if (!auth.token) {
      const guestCart = await loadGuestCart();

      const existingItemIndex = guestCart.findIndex(
        i => i.product === cartItem.product && i.selectedPrice === cartItem.selectedPrice
      );

      let returnedItem;

      if (existingItemIndex >= 0) {
        // Update quantity
        guestCart[existingItemIndex].qty += cartItem.qty;
        returnedItem = guestCart[existingItemIndex];
      } else {
        // Add new item with unique ID
        const newItem = {
          ...cartItem,
          id: generateTempId()
        };
        guestCart.push(newItem);
        returnedItem = newItem;
      }

      await saveGuestCart(guestCart);
      return returnedItem; // ✅ return only updated/added item
    }

    // Authenticated user flow
    const response = await axios.post(`${CART_BASE}/addToCart`, cartItem, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data.data;
  }
);


export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, payload }, { getState }) => {
    const { auth } = getState();
    
    if (!auth.token) {
      const guestCart = await loadGuestCart();
      const itemIndex = guestCart.findIndex(item => item.id === itemId);
      
      if (itemIndex >= 0) {
        guestCart[itemIndex] = { 
          ...guestCart[itemIndex], 
          ...payload,
          id: guestCart[itemIndex].id // Preserve existing ID
        };
        await saveGuestCart(guestCart);
        return {
          updatedItemId: itemId,
          updatedItem: guestCart[itemIndex]
        };
      }
      throw new Error('Item not found in guest cart');
    }

    // Authenticated user flow
    const response = await axios.patch(
      `${CART_BASE}/updateCartItemById/${itemId}`,
      payload,
      { headers: { Authorization: `Bearer ${auth.token}` }}
    );
    return {
      updatedItemId: itemId,
      updatedItem: response.data.data
    };
  }
);

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId, { getState }) => {
    const { auth } = getState();
    
    if (!auth.token) {
      const guestCart = await loadGuestCart();
      const updatedCart = guestCart.filter(item => item.id !== itemId);
      await saveGuestCart(updatedCart);
      return updatedCart;
    }

    await axios.delete(`${CART_BASE}/deleteCartItemById/${itemId}`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    const response = await axios.get(`${CART_BASE}/getAllCartItems`, {
      headers: { Authorization: `Bearer ${auth.token}` }
    });
    return response.data.data;
  }
);

export const mergeGuestCart = createAsyncThunk(
  'cart/mergeGuestCart',
  async (_, { getState, dispatch }) => {
    const { auth } = getState();
    if (!auth.token) throw new Error('User not authenticated');
    
    const guestCart = await loadGuestCart();
    if (guestCart.length === 0) return;

    try {
      const mergePayload = {
        cartItems: guestCart.map(item => ({
          product: item.product,
          qty: item.qty,
          selectedPrice: item.selectedPrice,
          isDigital: item.isDigital || false
        }))
      };
      
      await axios.post(`${CART_BASE}/mergeCart`, mergePayload, {
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      
      await clearGuestCart();
      const response = await dispatch(fetchCartItems());
      return response.payload;
    } catch (error) {
      console.error('Error merging cart:', error);
      throw error;
    }
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
    },
    loadGuestCart: (state, action) => {
      state.items = action.payload;
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

  const addedItem = action.payload;

  // If returned payload is an array, it's replacing the entire guest cart (BUGGY!)
  // But we are fixing that by checking if it's a single item object
  if (Array.isArray(addedItem)) {
    // Fallback (shouldn't happen): replace the cart (only used during login merge)
    state.items = addedItem;
  } else if (addedItem?.product && addedItem?.selectedPrice) {
    // Guest cart: update only one item in-place
    const existingIndex = state.items.findIndex(
      i => i.product === addedItem.product && i.selectedPrice === addedItem.selectedPrice
    );

    if (existingIndex >= 0) {
      // Update quantity of existing item
      state.items[existingIndex].qty += addedItem.qty;
    } else {
      // Add new item
      state.items.push(addedItem);
    }
  } else {
    // Logged-in flow: replace full cart from server
    state.items = addedItem;
  }

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
        state.loading = false;
        const index = state.items.findIndex(
          item => (item._id || item.id) === action.payload.updatedItemId
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload.updatedItem
          };
        }
        state.lastUpdated = Date.now();
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.lastUpdated = Date.now();
      })
      .addCase(mergeGuestCart.fulfilled, (state, action) => {
        state.items = action.payload || state.items;
        state.lastUpdated = Date.now();
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;