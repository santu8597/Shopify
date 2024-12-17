import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const product_get=createAsyncThunk("app/get" , async (id) => {
    const response=await fetch(`http://localhost:5000/api/products/${id}`)
    const result=(await response).json()
    return result
})