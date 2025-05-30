import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LOGINAPI ,  SIGNUPAPI } from "../../api";
import { showMessage } from "react-native-flash-message";

export const loginUser = createAsyncThunk(
    'auth/loginUser',
     async ({identifier,password} , {rejectWithValue}) => {
        try {
            const response = await axios.post(LOGINAPI,{
                identifier,
                password
            });
            return response.data
        } catch (error) {
            const message = error?.response?.data?.message || 'Login failed. Please try again!';
            showMessage({
                 message: message,
                 type: "danger",
                 color: "#fff",
                 icon: "danger",
                 duration: 3000,
                 animated: true,
            });
            return rejectWithValue(message)
        }
        
     }
)


export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async ({username,email,password} , {rejectWithValue}) => {
        try {
            const response = await axios.post(SIGNUPAPI,{
                username,
                email,
                password
            });
            return response.data
        } catch (error) {
            const message = error?.response?.data?.message || 'Signup failed. Please try again!';
          showMessage({
                 message: message,
                 type: "danger",
                 color: "#fff",
                 icon: "danger",
                 duration: 3000,
                 animated: true,
            });
            return rejectWithValue(message)
        }
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState:{
        user:null,
        token:null,
        loading:false,
        error:null
    },
    reducers:{
    logout: state => {
      state.user = null;
      state.token = null;
    },
    },
      extraReducers: builder => {
        builder
        //signIn
        .addCase(loginUser.pending, state => {
            state.loading = true,
            state.error = null
        })
        .addCase(loginUser.fulfilled, (state, action )=> {
            state.loading = false,
            state.user = {
              id: action.payload._id,
             username: action.payload.username,
            email: action.payload.email,
            role: action.payload.role,
            cart: action.payload.cart,
            addresses: action.payload.addresses,
                     };
           state.token = action.payload.token;
        })
        .addCase(loginUser.rejected , (state, action) => {
            state.loading = false,
            state.error = action.payload
        })

        // Signup
         .addCase(signupUser.pending, state => {
            state.loading = true,
            state.error = null
        })
        .addCase(signupUser.fulfilled, (state, action )=> {
            state.loading = false,
            state.user = action.payload.user;
             state.token = null;
          
        })
        .addCase(signupUser.rejected , (state, action) => {
            state.loading = false,
            state.error = action.payload
        })

      }
});

export const {logout} = authSlice.actions
export default authSlice.reducer