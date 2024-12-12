import { createSlice } from '@reduxjs/toolkit';

const connectionRequestsSlice = createSlice({
  name: 'connectionRequests',
  initialState: null,
  reducers: {
    addConnectionRequests: (state, action) => action.payload,
  },
});

export const { addConnectionRequests } = connectionRequestsSlice.actions;

export default connectionRequestsSlice.reducer;
