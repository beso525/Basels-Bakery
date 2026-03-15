import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading : false,
  productList: [],
  productDetails: null
}

export const displayFilteredProducts = createAsyncThunk('/products/displayFilteredProducts', 
  async ({filterParams, sortParams}) => {

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams
    })
  const result = await axios.get(
    `http://localhost:5000/api/shop/products/get?${query}`);
  return result?.data;
})

export const displayProductDetails = createAsyncThunk('/products/displayProductDetails', 
  async (id) => {
  const result = await axios.get(
    `http://localhost:5000/api/shop/products/get/${id}`);
  return result?.data;
})

const UserProductSlice = createSlice({
  name : 'shoppingProducts',
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(displayFilteredProducts.pending, (state) => {
      state.isLoading = true
    })
    .addCase(displayFilteredProducts.fulfilled, (state, action) => {
      state.isLoading = false
      state.productList = action.payload.data
    })
    .addCase(displayFilteredProducts.rejected, (state) => {
      state.isLoading = false
      state.productList = []
    })
    .addCase(displayProductDetails.pending, (state) => {
      state.isLoading = true
    })
    .addCase(displayProductDetails.fulfilled, (state, action) => {
      state.isLoading = false
      state.productDetails = action.payload
    })
    .addCase(displayProductDetails.rejected, (state) => {
      state.isLoading = false
      state.productDetails = null
    })
  }
})

export const { setProductDetails } = UserProductSlice.actions;
export default UserProductSlice.reducer;