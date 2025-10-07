import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import notificationReducer from './slices/notificationSlice';

const store = configureStore({
  reducer: {
    products: productReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
