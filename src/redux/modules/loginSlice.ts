import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  user: {
    displayName: '',
    email: '',
    photoURL: '',
    uid: '',
  },
};

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    isLogin: (state, action) => {
      state.isLogin = true;
      state.user = action.payload;
    },
    notLogin: (state) => {
      state.isLogin = false;
      state.user = {
        displayName: '',
        email: '',
        photoURL: '',
        uid: '',
      };
    },
  },
});

export const { isLogin, notLogin } = login.actions;
export default login.reducer;
