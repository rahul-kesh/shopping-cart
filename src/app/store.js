import { configureStore } from '@reduxjs/toolkit'
import counterReducer  from '../features/counter/counterSlice'
import cartReducer from '../features/cart/cartSlice'
import productReducer from '../features/product/productSlice'
export const store = configureStore({
  reducer: {
    counter:counterReducer,
    cart:cartReducer,
    product:productReducer
  },
})