import api from '@/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading : false,
  productList: []
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct', 
  async (formData) => {
  const result = await api.post(`/api/admin/products/add`, formData, {
    headers : {
      'Content-Type' : 'application/json'
    }
  })
  return result?.data;
})

export const fetchProducts = createAsyncThunk('/products/fetchproducts', 
  async () => {
  const result = await api.get(`/api/admin/products/get`);
  return result?.data;
})

export const editProduct = createAsyncThunk('/products/editproduct', 
  async ({id, formData}) => {
  const result = await api.put(`/api/admin/products/edit/${id}`, formData, {
    headers : {
      'Content-Type' : 'application/json'
    }
  })
  return result?.data;
})

export const deleteProduct = createAsyncThunk('/products/deleteproduct', 
  async ({id}) => {
  const result = await api.delete(`/api/admin/products/delete/${id}`);
  return result?.data;
})

const AdminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers : (builder) => {
    builder
    .addCase(fetchProducts.pending, (state) => {
      state.isLoading = true
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false,
      state.productList = action.payload.data
    })
    .addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false,
      state.productList = []
    })
  }
})

export default AdminProductsSlice.reducer;