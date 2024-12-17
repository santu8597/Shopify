import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const cart_add = createAsyncThunk("app/cart_add", async (detail,id) => {
  const headers={
    "Content-Type": "application/json",
    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTI5OThmZWVkZWE5OGQ5NmFhMDYwZCIsImlhdCI6MTczNDAyNDcwOCwiZXhwIjoxNzM2NjE2NzA4fQ.3gkuzPhm18OGWe4AgNMkCkIG3qc_AMnLI7OQLkMLHVI"
}
  try {
    axios.put(`http://localhost:5000/api/cart/add/${id}`, detail,{headers})
      .then((response) => {
          
         return response
      })
      .catch((e) => console.log('something went wrong :(', e))
  } catch (error) {

  }
})

const addCart = createSlice({
  name: "addCart",
  initialState: {
    dataOfItem: {},
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(cart_add.pending, (state, action) => {
      state.loading = true;
      state.error = (action.payload)
    })
    builder.addCase(cart_add.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;

    })
    builder.addCase(cart_add.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload)
    })
  }
})
export default addCart.reducer