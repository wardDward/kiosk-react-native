import {configureStore} from '@reduxjs/toolkit';
import orderSlice from './features/orderSlice';
import productSlice from './features/productSlice';

const store = configureStore({
  reducer: {
    order: orderSlice,
    product: productSlice,
  },
});

export default store;
