import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import chatReducer from './slice/chatSlice';
import userReducer from './slice/userSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  user: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
