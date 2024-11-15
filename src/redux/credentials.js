import { createSlice } from "@reduxjs/toolkit";

const initialState={
    userCredentials:localStorage.getItem(import.meta.env.VITE_USER)
    ? JSON.parse(localStorage.getItem(import.meta.env.VITE_USER))
    : null,
    token: localStorage.getItem(import.meta.env.VITE_TOKEN)
      ? JSON.parse(localStorage.getItem(import.meta.env.VITE_TOKEN))
      : null,
    loading:false,
    isforgotPassword:false,
    signupData:null
    
}


const credentialSlice=createSlice({
    name:"credential",
    initialState,
    reducers:{
        setCredential(state,action){
            state.userCredentials=action.payload
        },
        setToken(state,action){
            state.token=action.payload
        },
        setLoading(state,action){
            state.loading=action.payload
        },
        setForgotPassword(state,action){
            state.isforgotPassword=!state.isforgotPassword;
        }
        ,
        setSignupData(state,action){
            state.signupData=action.payload
        }
    }
})

export const credentialAction=credentialSlice.actions;

export default credentialSlice;