import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const cart_get = createAsyncThunk("app/cart_get", async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/getCart`,{
      method: "GET",
     
      headers: {
          "Content-Type": "application/json",
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTI5OThmZWVkZWE5OGQ5NmFhMDYwZCIsImlhdCI6MTczNDAyNDcwOCwiZXhwIjoxNzM2NjE2NzA4fQ.3gkuzPhm18OGWe4AgNMkCkIG3qc_AMnLI7OQLkMLHVI"
      }
    })
    const result = await response.json()
    return result
  } catch (error) {

  }
})

const cartDetail = createSlice({
  name: "cartDetail",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(cart_get.pending, (state, action) => {
      state.loading = true;
      state.error = (action.payload)
    })
    builder.addCase(cart_get.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

    })
    builder.addCase(cart_get.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload)
    })
  }
})
export default cartDetail.reducer