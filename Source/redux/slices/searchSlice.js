// redux/slices/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData } from '../../utils/apiClient';
import {FETCHPRODUCTS, GETALLCATEGORIES, GETALLPRODUCTS, POPULARPRODUCTS} from '../../api'
import { IMG_URL } from '../../api';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchResults',
  async (keyword, { rejectWithValue }) => {
    try {
      if (!keyword.trim()) return { products: [], suggestions: [] };
      
      const [productsRes, suggestionsRes] = await Promise.all([
        getData(`${FETCHPRODUCTS}${encodeURIComponent(keyword)}`),
        getData(`${GETALLPRODUCTS}${encodeURIComponent(keyword)}&limit=5`)
      ]);

      return {
        products: (productsRes?.products || []).map(product => ({
          ...product,
          images: Array.isArray(product.images)
            ? product.images.map(img => `${IMG_URL}${img}`)
            : [],
        })),
        suggestions: Array.isArray(suggestionsRes?.products)
          ? suggestionsRes.products.map(p => p.name)
          : []
      };
    } catch (error) {
      console.log("FETCH RESULTS ERROR IS", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const fetchInitialSuggestions = createAsyncThunk(
  'search/fetchInitialSuggestions',
  async (_, { rejectWithValue }) => {
    try {
      const [popularProducts, categories] = await Promise.all([
        getData(POPULARPRODUCTS),
        getData(GETALLCATEGORIES)
      ]);
      
      return {
        popularSearches: popularProducts.products.map(p => p.name),
        categories: categories.slice(0, 6)
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    keyword: '',
    results: [],
    suggestions: [],
    recentSearches: [],
    popularSearches: [],
    loading: false,
    error: null,
    isDebouncing: false,
    categories: [], 
  },
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
      state.isDebouncing = true;
    },
    clearResults: (state) => {
      state.results = [];
      state.suggestions = [];
      state.keyword = '';
      state.error = null;
    },
    addRecentSearch: (state, action) => {
      state.recentSearches = [
        action.payload,
        ...state.recentSearches.filter(item => item !== action.payload)
      ].slice(0, 5);
    },
    endDebouncing: (state) => {
      state.isDebouncing = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.products;
        state.suggestions = action.payload.suggestions;
        state.isDebouncing = false;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isDebouncing = false;
      })
     

       .addCase(fetchInitialSuggestions.fulfilled, (state, action) => {
  state.popularSearches = action.payload.popularSearches;
  state.categories = action.payload.categories;
})
      
  },
});

export const { 
  setKeyword, 
  clearResults, 
  addRecentSearch,
  endDebouncing 
} = searchSlice.actions;

export default searchSlice.reducer;