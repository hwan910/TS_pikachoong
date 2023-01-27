import { configureStore } from '@reduxjs/toolkit';
import location from '../modules/locationSlice';
import search from '../modules/searchSlice';
import login from "../modules/loginSlice"

const store = configureStore({
  reducer: { location, search, login },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
