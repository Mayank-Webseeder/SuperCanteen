import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { putData, getData } from '../../utils/apiClient';
import { GET_PROFILE , GET_USER_ADDRESS , UPDATE_PROFILE} from '../../api';


export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, thunkAPI) => {
    try {
      const data = await getData(GET_PROFILE);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserAddresses = createAsyncThunk(
  'user/getUserAddresses',
  async (_, thunkAPI) => {
    try {
      const data = await getData(GET_USER_ADDRESS);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, thunkAPI) => {
    try {
      const data = await putData(UPDATE_PROFILE, profileData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const initialState = {
  profile: null,
  addresses: [],
  loading: false,
  error: null,
  updateSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUpdateStatus: (state) => {
      state.updateSuccess = false;
    },
    clearUserData: (state) => {
      state.profile = null;
      state.addresses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Profile
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get User Addresses
      .addCase(getUserAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.addresses = action.payload.addresses || [];
      })
      .addCase(getUserAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
        if (action.payload.data) {
          state.profile = action.payload.data;
        }
        // Update addresses if they were included in the update
        if (action.payload.data?.addresses) {
          state.addresses = action.payload.data.addresses;
        }
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.updateSuccess = false;
      });
  },
});

export const { resetUpdateStatus, clearUserData } = userSlice.actions;
export default userSlice.reducer;