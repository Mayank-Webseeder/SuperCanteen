import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData, putData } from '../../utils/apiClient';
import { GET_NOTIFICATIONS , UNREAD_COUNT , MARK_AS_READ,MARK_ALL_READ,SAVE_FCM_TOKEN } from '../../api';

// Async Thunks
export const fetchNotifications = createAsyncThunk(
  'notification/fetchNotifications',
  async (userId, thunkAPI) => {
    try {
      const data = await getData(`${GET_NOTIFICATIONS}/${userId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  'notification/fetchUnreadCount',
  async (userId, thunkAPI) => {
    try {
      const data = await getData(`${UNREAD_COUNT}/${userId}`);
      console.log("DATA IS",data)
      return data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  'notification/markAsRead',
  async (notificationId, thunkAPI) => {
    try {
    await putData(`${MARK_AS_READ}/${notificationId}`);
      return notificationId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  'notification/markAllAsRead',
  async (userId, thunkAPI) => {
    try {
   await postData(MARK_ALL_READ, { userId });
     
      return userId;
    } catch (error) {
      console.log("error is",error)
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const saveFcmTokenToServer = createAsyncThunk(
  'notification/saveFcmTokenToServer',
  async (token, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const response = await postData(
        `${SAVE_FCM_TOKEN}`,
        { token },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      console.log('✅ FCM token successfully saved:', response.message);
      return token;
    } catch (error) {
      console.error('❌ FCM Token Save Failed:', error.message);
      if (error?.response) {
        console.error('➡️ Backend Response:', error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  fcmToken: null,
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  socketConnected: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    saveFCMToken: (state, action) => {
      state.fcmToken = action.payload;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => { // Added this reducer
      const notification = state.notifications.find(
        n => n._id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => { // Added this reducer
      state.notifications.forEach(n => n.read = true);
      state.unreadCount = 0;
    },
    clearNotifications: (state) => { // Added this reducer
      state.notifications = [];
      state.unreadCount = 0;
    },
    setSocketConnected: (state, action) => {
      state.socketConnected = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Unread Count
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
        console.log("fetchUnreadCount",action.payload)
      })

        .addCase(fetchUnreadCount.rejected, (state, action) => {
         state.loading = false;
        state.error = action.payload;
        console.log("fetchUnreadCount Rejected",action.payload)
      })
      
      
      // Mark as Read
      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          n => n._id === action.payload
        );
        if (notification && !notification.read) {
          notification.read = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      
      // Mark All as Read
      .addCase(markAllNotificationsAsRead.fulfilled, (state,action) => {
        state.notifications.forEach(n => n.read = true);
        state.unreadCount = 0;
        console.log("ddddddddddddddddddd",action.payload)
      })

      .addCase(saveFcmTokenToServer.fulfilled, (state,action) => {
        state.fcmToken = action.payload;
      })
        .addCase(saveFcmTokenToServer.rejected, (state, action) => {
      })

  }
});

export const {  
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  setSocketConnected } = notificationSlice.actions;
export default notificationSlice.reducer;