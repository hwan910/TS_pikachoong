import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  zcode: '11',
  zscode: '11680',
};

const search = createSlice({
  name: 'search',
  initialState,
  reducers: {
    switchSearchResult: (state, action) => {
      state.zcode = action.payload[0];
      state.zscode = action.payload[1];
    },
  },
});

export const { switchSearchResult } = search.actions;
export default search.reducer;
