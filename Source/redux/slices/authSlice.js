import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FORGOTPASSWORD, LOGINAPI, SENDRESETPASSWORDOTP, SIGNUPAPI } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optimized API calls with timeouts
const apiCall = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      timeout: 10000, // 10 second timeout
    });
    return response;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return { error: 'Request timed out. Please try again.' };
    }
    return { error: error.response?.data?.message || error.message };
  }
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ identifier, password }, { rejectWithValue }) => {
    const response = await apiCall(LOGINAPI, { identifier, password });
    
    if (response.error) {
      return rejectWithValue(response.error);
    }
    
    return response.data;
  }
);

export const signupUser = createAsyncThunk(
  'auth/signupUser',
  async ({ username, email, password }, { rejectWithValue }) => {
    const response = await apiCall(SIGNUPAPI, { username, email, password });
    
    if (response.error) {
      return rejectWithValue(response.error);
    }
    
    return response.data;
  }
);

export const sendResetPasswordOtp = createAsyncThunk(
  'auth/email',
  async ({ email }, { rejectWithValue }) => {
    const response = await apiCall(SENDRESETPASSWORDOTP, { email });
    
    if (response.error) {
      return rejectWithValue(response.error);
    }
    
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async ({ email, otp, newPassword }, { rejectWithValue }) => {
    const response = await apiCall(FORGOTPASSWORD, { email, otp, newPassword });
    
    if (response.error) {
      return rejectWithValue(response.error);
    }
    
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null
  },
  reducers: {
    logout: (state) => {
  state.user = null;
  state.token = null;
  AsyncStorage.multiRemove(['authUser', 'authToken']);
},
  },
  extraReducers: builder => {
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    builder
      // Login
      .addCase(loginUser.pending, handlePending)
     .addCase(loginUser.fulfilled, (state, action) => {
  state.loading = false;
  state.user = {
    id: action.payload._id,
    username: action.payload.username,
    email: action.payload.email,
    role: action.payload.role,
    cart: action.payload.cart,
    addresses: action.payload.addresses,
  };
  state.token = action.payload.token;

  // Save to AsyncStorage
  AsyncStorage.setItem('authUser', JSON.stringify(state.user));
  AsyncStorage.setItem('authToken', action.payload.token);
})
      .addCase(loginUser.rejected, handleRejected)
      
      // Signup
      .addCase(signupUser.pending, handlePending)
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, handleRejected)
      
      // Send OTP
      .addCase(sendResetPasswordOtp.pending, handlePending)
      .addCase(sendResetPasswordOtp.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendResetPasswordOtp.rejected, handleRejected)
      
      // Reset Password
      .addCase(resetPassword.pending, handlePending)
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, handleRejected);
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;