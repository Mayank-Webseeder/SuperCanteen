import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import authReducer from './slices/authSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import categoryReducer from './slices/categorySlice'
import brandReducer from './slices/brandSlice'
import subCategoryReducer from './slices/subcategorySlice'
import subCategoryProductReducer from './slices/subCategoryProductSlice'
import productReducer from './slices/productSlice'
import productDetailReducer from './slices/productDetailSlice'
import segmentReducer from './slices/segmentSlice'
import serachReducer from './slices/searchSlice'
import productBySegmentReducer from './slices/productBySegmentSlice';
import productByBrandReducer from './slices/productsByBrandSlice'
import cartReducer from './slices/cartSlice'
import cartProductReducer from './slices/cartProductsSlice'
import wishlistReducer from './slices/wishlistSlice'
import addressReducer from './slices/addressSlice';
import couponReducer from './slices/couponSlice'
import userReducer from './slices/userSlice'
import sectionReducer from './slices/sectionSlice'

// Combine all reducers
const appReducer = combineReducers({
     auth:authReducer,
    category:categoryReducer,
    brand:brandReducer,
    subCategory: subCategoryReducer,
    subCategoryProducts:subCategoryProductReducer,
    product:productReducer,
    productDetail: productDetailReducer,
    segment: segmentReducer,
    search:serachReducer,
    productsBySegment: productBySegmentReducer,
    productsByBrand : productByBrandReducer,
    cart:cartReducer,
    cartProducts:cartProductReducer,
    wishlist:wishlistReducer,
    address: addressReducer,
    coupon:couponReducer,
    user:userReducer,
    section: sectionReducer,
 
});

// Root reducer with reset state capability
const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    // Clear persisted state on logout
    AsyncStorage.removeItem('persist:root');
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth', 'coupon'],
  // Optional performance optimizations
  throttle: 1000, // Throttle storage saves
  version: 1,
  migrate: (state) => {
    // Add migration logic if needed
    return Promise.resolve(state);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // Disable immutable check in production for performance
      immutableCheck: process.env.NODE_ENV !== 'production',
    }),
  // Enable dev tools only in development
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store, null, () => {
  // Optional: Add callback when rehydration is complete
  console.log('Rehydration complete');
});
 