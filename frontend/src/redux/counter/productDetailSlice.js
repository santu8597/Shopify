import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//get all products data using redux
export const getProduct=createAsyncThunk("app/getProduct", async ()=>{
   const response=await fetch(`http://localhost:5000/api/products/all`)   
   try {
    const result=await response.json()
    
    return result
  } catch (error) {

  }
})
const productDetail= createSlice({
    name:"productDetail",
    initialState:{
       data:{sucess:true,products:[]},
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
            state.data.sucess=action.payload.sucess;
            state.data.products=action.payload.products;
          })
          builder.addCase(getProduct.rejected,(state,action)=>{
            state.loading=false;
            state.error=(action.payload)
          })
      }
})
export default productDetail.reducer