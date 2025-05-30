import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice'
import { persistStore , persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rootReducer = combineReducers({
    auth:authReducer
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


 