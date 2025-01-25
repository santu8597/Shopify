import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//get all products data using redux
const host="http://localhost:5000"
export const getProduct=createAsyncThunk("app/getProduct", async ()=>{
   const response=await fetch(`${host}/api/products/all`)   
   try {
    const result=await response.json()
    
    return result
  } catch (error) {

  }
})
const productDetail= createSlice({
    name:"productDetail",
    initialState:{
       data:[],
        loading:false,
        error:null,
    },
    extraReducers:(builder)=>{
        builder.addCase(getProduct.pending,(state,action)=>{
            state.loading=true;
            state.error=(action.payload)
          })
          builder.addCase(getProduct.fulfilled,(state,action)=>{
            state.loading=false;
            state.data=action.payload
           
          })
          builder.addCase(getProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=(action.payload)
          })
      }
})
export default productDetail.reducer