import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authStore/authSlice';
import { notificationManagementApi } from './services/notificationService';
import { authApi } from './services/authService';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [notificationManagementApi.reducerPath]: notificationManagementApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([notificationManagementApi.middleware, authApi.middleware]),
  devTools: process.env.NODE_ENV !== 'production',
});
