// wishlistSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postData, deleteData, getData } from '../../utils/apiClient';
import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  GET_WHISHLIST_BY_USERID
} from '../../api'
import { createSelector } from '@reduxjs/toolkit';

const selectWishlist = (state) => state.wishlist;
const selectAllCategories = (state) => state.category.categories || [];


// Helper to extract unique category IDs
const extractCategoryIds = (products) => {
  const categorySet = new Set();
  products.forEach(item => {
    if (item.product?.category) {
      categorySet.add(item.product.category);
    }
  });
  return Array.from(categorySet);
};

export const fetchWishlistItems = createAsyncThunk(
  'wishlist/fetchWishlistItems',
  async (userId, { rejectWithValue }) => {
    console.log("USER ID IS",userId)
    try {
      const response = await getData(`${GET_WHISHLIST_BY_USERID}/${userId}`);
      const products = response.data.products || [];
      return {
       items: products
  .filter(item => item.product !== null)
  .map(item => ({
    ...item.product,
    wishlistId: item.product._id,
    addedAt: item.addedAt
  })),
        categories: extractCategoryIds(products)
      };
    } catch (err) {
      console.log("ERROR IS",err)
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'wishlist/addToWishlist',
  async ({ productId, userId }, { rejectWithValue }) => {
    try {
      const response = await postData(ADD_TO_WISHLIST, { productId, userId });
      return {
        ...response.data.product,
        wishlistId: response.data.product._id,
        addedAt: response.data.addedAt
      };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async ({ wishlistId, userId }, { rejectWithValue }) => {
    console.log("WHISHLIST ID IS and USER ID IS",wishlistId,userId)
    try {
      await deleteData(`${REMOVE_FROM_WISHLIST}/${userId}/product/${wishlistId}`);
      return wishlistId;
    } catch (err) {
      console.log("error is",err)
      return rejectWithValue(err.response?.data?.message || 'Failed to remove item');
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    categories: [], // This will store category IDs
    loading: false,
    error: null,
    lastAdded: null,
    initialized: false,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.categories = [];
      state.lastAdded = null;
    },
    resetWishlistError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlistItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.categories = action.payload.categories;
         state.initialized = true;
      })
      .addCase(fetchWishlistItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (!state.items.some(item => item._id === action.payload._id)) {
          state.items.unshift(action.payload);
          state.lastAdded = action.payload._id;
          // Add category ID if not already present
          if (action.payload.category && !state.categories.includes(action.payload.category)) {
            state.categories.push(action.payload.category);
          }
        }
        console.log("FULLFIELD WHISHLIST",action.payload)
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const removedItem = state.items.find(item => item.wishlistId === action.payload);
        state.items = state.items.filter(item => item.wishlistId !== action.payload);
        // Remove category if no more items exist in that category
        if (removedItem?.category && 
            !state.items.some(item => item.category === removedItem.category)) {
          state.categories = state.categories.filter(catId => catId !== removedItem.category);
        }
        console.log("REMOVED FROM WHISHLIST",action.payload)
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("REJECTED FROM WHISHLIST IS",action.payload)
      })
  }
});

// Selector to combine wishlist items with category names
export const selectWishlistWithCategories = createSelector(
  [selectWishlist, selectAllCategories],
  (wishlist, allCategories) => {
    const { items, categories: categoryIds } = wishlist;
    
    // Map category IDs to their full category objects
    const categoriesWithNames = categoryIds.map(catId => {
      // Find the full category object from allCategories
      const foundCategory = allCategories.find(c => c._id === catId);
      
      // If found, return it with the name
      if (foundCategory) {
        return foundCategory;
      }
      
      // If not found, return minimal object with ID and placeholder name
      return { 
        _id: catId, 
        name: `Category ${catId.slice(-4)}` 
      };
    });

    return {
      ...wishlist,
      categories: categoriesWithNames
    };
  }
);
export const { clearWishlist, resetWishlistError } = wishlistSlice.actions;
export default wishlistSlice.reducer;