import { configureStore } from '@reduxjs/toolkit'
import productDetail from './counter/productDetailSlice'
import productById from './counter/productById'
import cartDetail from './counter/cartDetail'

export const store = configureStore({
  reducer: {
    product_all:productDetail,
    product_id:productById,
    cart_all:cartDetail
    

  },
})