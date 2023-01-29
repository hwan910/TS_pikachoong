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
      state.user.displayName = action.payload.displayName;
      state.user.email = action.payload.email;
      state.user.photoURL = action.payload.photoURL;
      state.user.uid = action.payload.uid;
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
