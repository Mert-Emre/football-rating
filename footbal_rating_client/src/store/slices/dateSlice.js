import { createSlice } from "@reduxjs/toolkit";

const current = new Date();
const day = current.getDate();
const month = current.getMonth();
const year = current.getFullYear();

const dateSlice = createSlice({
  name: "date",
  initialState: { day, month, year },
  reducers: {
    setPickerDate(state, action) {
      state.day = action.payload.day;
      state.month = action.payload.month;
      state.year = action.payload.year;
    },
  },
});

export const dateReducer = dateSlice.reducer;
export const { setPickerDate } = dateSlice.actions;
