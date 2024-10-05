import { createSlice } from "@reduxjs/toolkit";

const pathSlice = createSlice({
  name: "path",
  initialState: "/",
  reducers: {
    changePath(state, action) {
      return action.payload;
    },
  },
});

export const { changePath } = pathSlice.actions;
export const pathReducer = pathSlice.reducer;
