import { configureStore } from '@reduxjs/toolkit';
import location from '../modules/locationSlice';
import search from '../modules/searchSlice';

const store = configureStore({
  reducer: { location, search },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
