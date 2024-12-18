import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const host="http://192.168.0.135:5000"
export const product_get = createAsyncThunk("app/product_get", async (id) => {
  try {
    const response = await fetch(`${host}/api/products/${id}`)
    const result = await response.json()
    return result
  } catch (error) {

  }
})

const productById = createSlice({
  name: "productById",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(product_get.pending, (state, action) => {
      state.loading = true;
      state.error = (action.payload)
    })
    builder.addCase(product_get.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

    })
    builder.addCase(product_get.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload)
    })
  }
})
export default productById.reducer