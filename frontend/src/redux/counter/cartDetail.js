import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const headers={
  "Content-Type": "application/json",
  "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTI5OThmZWVkZWE5OGQ5NmFhMDYwZCIsImlhdCI6MTczNDAyNDcwOCwiZXhwIjoxNzM2NjE2NzA4fQ.3gkuzPhm18OGWe4AgNMkCkIG3qc_AMnLI7OQLkMLHVI"
}
const host="http://192.168.0.135:5000"
export const cart_get = createAsyncThunk("app/cart_get", async () => {
  try {
    const response = await fetch(`${host}/api/cart/getCart`,{
      method: "GET",
     headers: headers
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
})


export const deleteFromCart = createAsyncThunk("app/deleteFromCart", async (id) => {
  try {
    const response = await fetch(`${host}/api/cart/${id}/delete`,{
      method: "PUT",
     
      headers: headers
    })
    const result = await response.json()
    return result
  } catch (error) {
    console.log(error)
  }
})



export const addToCart = createAsyncThunk("app/addCart", async (details) => {
  const response = await fetch(`${host}/api/cart/add/${details.id}`,{
    method: "PUT",
    body:JSON.stringify(details.detail),
   headers: headers
  })
  const result = await response.json()
 return result
})

export const updateCart = createAsyncThunk("app/updateCart", async (details) => {
  try {
    const response = await fetch(`${host}/api/cart/${details.id}/updateQuantity`,{
      method: "PUT",
      body:JSON.stringify(details.detail),
     headers: headers
    })
    
    const result = await response.json()
    console.log(result)
   return result
  } catch (error) {
    console.log(error)
  }
})



const cartDetail = createSlice({
  name: "cartDetail",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(cart_get.pending, (state, action) => {
      state.status = "loading";
      state.error = (action.payload)
    }),
    builder.addCase(cart_get.fulfilled, (state, action) => {
      state.status = "sucess";
      state.data = action.payload;

    }),
    builder.addCase(cart_get.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload)
    }),
    builder.addCase(deleteFromCart.pending, (state, action) => {
      state.status = "loading";
      state.error = (action.payload)
    }),
    builder.addCase(deleteFromCart.fulfilled, (state, action) => {
      state.status = "sucess";
      const { _id } = action.payload;
      if (_id) {state.data = state.data.filter((ele) => String(ele._id) !== String(_id));}}),
    builder.addCase(deleteFromCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload)
    }),

    builder.addCase(addToCart.pending, (state, action) => {
      state.status = "loading";
      state.error = (action.payload)
    }),
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.status = "sucess";
     state.data=action.payload;

    }),
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload)
    })
    builder.addCase(updateCart.pending, (state, action) => {
      state.status = "loading";
      state.error = (action.payload)
    }),
    builder.addCase(updateCart.fulfilled, (state, action) => {
      state.status = "sucess";
      console.log(action.payload)
      state.data = state.data.map((ele) =>
        String(ele._id) === String(action.payload._id) ? action.payload : ele
      );
    
    }),
    builder.addCase(updateCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = (action.payload)
    })
  }
})
export default cartDetail.reducer