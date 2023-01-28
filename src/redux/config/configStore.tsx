import { configureStore } from '@reduxjs/toolkit';
import location from '../modules/locationSlice';

import login from '../modules/loginSlice';

const store = configureStore({
  reducer: { location, login },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
