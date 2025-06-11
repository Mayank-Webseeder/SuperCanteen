import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import { persistStore , persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import categoryReducer from './slices/categorySlice'
import brandReducer from './slices/brandSlice'
import subCategoryReducer from './slices/subcategorySlice'
import subCategoryProductReducer from './slices/subCategoryProductSlice'
import productReducer from './slices/productSlice'
import productDetailReducer from './slices/productDetailSlice'
import smilarProductReducer from './slices/similarProductSlice'
import segmentReducer from './slices/segmentSlice'
import serachReducer from './slices/searchSlice'
import productBySegmentReducer from './slices/productBySegmentSlice';

const rootReducer = combineReducers({
    auth:authReducer,
    category:categoryReducer,
    brand:brandReducer,
    subCategory: subCategoryReducer,
    subCategoryProducts:subCategoryProductReducer,
    product:productReducer,
    productDetail: productDetailReducer,
    similarProduct:smilarProductReducer,
    segment: segmentReducer,
    search:serachReducer,
    productsBySegment: productBySegmentReducer
});

const persistConfig = {
    key:'root',
    storage:AsyncStorage,
    whitelist: ['auth']
}

const persistedReducer  = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persistedReducer ,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);


 