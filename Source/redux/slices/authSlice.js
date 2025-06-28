import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FORGOTPASSWORD, LOGINAPI, SENDRESETPASSWORDOTP, SIGNUPAPI } from "../../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Optimized API calls with timeouts
const apiCall = async (url, data) => {
  try {
    const response = await axios.post(url, data, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return { data: response.data };
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      return { error: 'Request timed out' };
    }
    return { 
      error: error.response?.data?.message || 
             error.message || 
             'Network request failed'
    };
  }
};

const setAuthData = async (user, token) => {
  try {
    await Promise.all([
      AsyncStorage.setItem('authUser', JSON.stringify(user)),
      AsyncStorage.setItem('authToken', token)
    ]);
  } catch (e) {
    console.warn('AsyncStorage set error:', e);
  }
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ identifier, password }, { rejectWithValue }) => {
    const { data, error } = await apiCall(LOGINAPI, { identifier, password });
    return error ? rejectWithValue(error) : data;
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
    error: null,
    initialized: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.initialized = false;
      AsyncStorage.multiRemove(['authUser', 'authToken']).catch(console.warn);
    },
    setAuthInitialized: (state) => {
      state.initialized = true;
    }
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

   setAuthData(state.user, action.payload.token);
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

export const { logout, setAuthInitialized } = authSlice.actions;
export default authSlice.reducer;