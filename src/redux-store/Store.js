import { configureStore } from '@reduxjs/toolkit';

import appsReducer from '../redux-store/AppSlice';

export default configureStore({
  reducer: {
    apps: appsReducer,
  },
});