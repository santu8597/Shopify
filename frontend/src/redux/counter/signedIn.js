import { createSlice } from "@reduxjs/toolkit";
const isLoggedIn = createSlice({
  name: "isLoggedIn",
  initialState: {
    
    signedIn:localStorage.getItem('auth-token')? true:false
  },
  reducers:{
    Logout(state){
      
      state.signedIn=false
    },
    Login(state){
      
        state.signedIn=true
      }
  },

 
})
export const { Logout,Login } = isLoggedIn.actions
export default isLoggedIn.reducer