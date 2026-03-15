import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";

import AdminProductsSlice from './auth-slice/admin/products-slice/index'
import AdminOrderSlice from './auth-slice/admin/order-slice/index'

import UserProductsSlice from './shop/products-slice/index'
import UserShopCartSlice from './shop/carts-slice/index'
import UserAddressSlice from './shop/address-slice/index'
import UserOrderSlice from './shop/order-slice/index'
import UserSearchSlice from './shop/search-slice/index'

const store = configureStore({
  reducer: {
    auth: authReducer,

    adminProducts: AdminProductsSlice,
    adminOrder: AdminOrderSlice,
    
    shoppingProducts: UserProductsSlice,
    shoppingCart: UserShopCartSlice,
    shopAddress: UserAddressSlice,
    shopOrder: UserOrderSlice,
    shopSearch: UserSearchSlice
  },
});

export default store;
