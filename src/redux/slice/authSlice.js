import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  id: null,
  name: null,
  token: '28|tm6y2PtIjvICsMytTjuZ13LFKMU6mSjt0FOoua2p',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload);
      const { email, id, name, token } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.id = id;
      state.name = name;
      state.token = token;
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.id = null;
      state.name = null;
      state.token = null;
    },
  },
});

export const { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.id;
export const selectUserName = (state) => state.auth.name;
export const selectToken = (state) => state.auth.token;
export default authSlice.reducer;
