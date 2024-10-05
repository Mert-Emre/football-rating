import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setCredentials } = authSlice.actions;
