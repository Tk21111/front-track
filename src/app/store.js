import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        //from authSlice
        auth : authReducer
    },
    //manage cahe life time and require in rtk
    middleware : getdefaultMiddleware =>
        getdefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

setupListeners(store.dispatch)