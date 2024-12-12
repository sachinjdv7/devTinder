import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionsReducer from './connestionsSlice';
import connectionRequestsReducer from './connectionRequestsSlice';

export const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: connectionRequestsReducer,
  },
});

export default appStore;
