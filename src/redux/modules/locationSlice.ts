import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zcode: "11",
  zscode: "11680",
};

const location = createSlice({
  name: "location",
  initialState,
  reducers: {
    addMyLocation: (state, action) => {
      state.zcode = action.payload.zcode;
      state.zscode = action.payload.zscode;
    },
  },
});

export const { addMyLocation } = location.actions;
export default location.reducer;
