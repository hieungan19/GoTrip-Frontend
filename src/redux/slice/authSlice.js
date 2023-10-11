import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  useName: null,
  fullName: null,
  userID: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload);
      const { email, userName, userID, fullName } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.userName = userName;
      state.userID = userID;
      state.fullName = fullName;
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.userName = null;
      state.userID = null;
      state.fullName = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserName = (state) => state.auth.userName;
export const selectUserID = (state) => state.auth.userID;
export const selectFullName = (state) => state.auth.fullName;
export default authSlice.reducer;
