import { createSlice } from '@reduxjs/toolkit';

const connectionRequestsSlice = createSlice({
  name: 'connectionRequests',
  initialState: null,
  reducers: {
    addConnectionRequests: (state, action) => action.payload,
    removeConnectionRequest: (state, action) => {
      const newArray = state.filter((req) => req._id !== action.payload);
      return newArray;
    },
  },
});

export const { addConnectionRequests, removeConnectionRequest } =
  connectionRequestsSlice.actions;

export default connectionRequestsSlice.reducer;
