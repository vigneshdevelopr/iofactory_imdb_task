import { createSlice } from "@reduxjs/toolkit";

 const Auth = createSlice({
    name:'auth',
    initialState:true,
    reducers:{
        loginToggle: ()=>true,
        SignupToggle:()=>false
        
    }
})

export const{loginToggle, SignupToggle} = Auth.actions

export default Auth.reducer