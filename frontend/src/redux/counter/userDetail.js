import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";
const host="http://localhost:5000"
export const user_get = createAsyncThunk("app/user_get", async () => {
    const headers={
        "Content-Type": "application/json",
       "auth-token": localStorage.getItem('auth-token')
      }
  try {
    const response = await fetch(`${host}/api/users/profile`,{
        method: "GET",
        headers: headers
    })
    const result = await response.json()
    
    return result
  } catch (error) {

  }
})

export const login=createAsyncThunk("app/user_login",async (detail)=>{
    
            const response = await fetch(`${host}/api/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: detail.email, password: detail.password }),
            });
            const data = await response.json();
            return data
            setIsLoading(false)
            if (data.sucess) {
                localStorage.setItem('auth-token', data.token);
                
            }
            else {
                if (data.type === 'user') { setError({ emailError: data.error, passwordError: "" }) }
                else { setError({ emailError: "", passwordError: data.error }) }
            }
})

const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    data: {},
    loading: false,
    error: {},
    signedIn:false
  },
  reducers:{
    Logout(state){
      state.data={}
      state.signedIn=false
    }
  },

  extraReducers: (builder) => {
    builder.addCase(user_get.pending, (state, action) => {
      state.loading = true;
      state.error = (action.payload)
    })
    builder.addCase(user_get.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload)
      state.data = action.payload.user;
      state.signedIn=true;

    })
    builder.addCase(user_get.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload)
    })
    builder.addCase(login.pending, (state, action) => {
        state.loading = true;
        state.error = (action.payload)
      })
      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        if(action.payload.sucess){ state.signedIn=true;}
       
  
      })
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload)
      })
  }
})
export const { Logout } = userDetail.actions
export default userDetail.reducer