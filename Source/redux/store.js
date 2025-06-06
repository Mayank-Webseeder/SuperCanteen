import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import { persistStore , persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import categoryReducer from './slices/categorySlice'
import brandReducer from './slices/brandSlice'
import categoriesByIdReducer from './slices/categoryByIdSlice'
import subCategoryByIdReducer from './slices/subcategoryByIdSlice'
import subCategoryReducer from './slices/subcategorySlice'
import subCategoryProductReducer from './slices/subCategoryProductSlice'

const rootReducer = combineReducers({
    auth:authReducer,
    category:categoryReducer,
    brand:brandReducer,
    categoryById: categoriesByIdReducer,
    subCategoryById: subCategoryByIdReducer,
    subCategory: subCategoryReducer,
    subCategoryProducts:subCategoryProductReducer
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


 