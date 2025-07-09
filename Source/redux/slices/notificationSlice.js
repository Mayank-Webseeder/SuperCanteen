import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getData, postData, putData } from '../../utils/apiClient';
import { GET_NOTIFICATIONS , UNREAD_COUNT , MARK_AS_READ,MARK_ALL_READ } from '../../api';

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
      await postData(`${MARK_ALL_READ}/${userId}`);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  fcmToken: null, // Added FCM token support
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
  socketConnected: false
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
      .addCase(markAllNotificationsAsRead.fulfilled, (state) => {
        state.notifications.forEach(n => n.read = true);
        state.unreadCount = 0;
      });
  }
});

export const {  
  saveFCMToken,
  addNotification,
  markAsRead,
  markAllAsRead,
  clearNotifications,
  setSocketConnected } = notificationSlice.actions;
export default notificationSlice.reducer;