import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  email: null,
  id: null,
  name: null,
  token: '2|InJFjVVfo1VpvzdAXvf96RqXQlzlsrdmIsRxJvVTa6680b1b',
  phone_number: null,
  cover_image_url: null,
  avatar_url: null,
  intro: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_USER_NAME: (state, action) => {
      state.avatar_url = action.payload.avatar_url;
    },
    SET_USER_AVATAR: (state, action) => {
      state.name = action.payload.name;
    },
    SET_USER_COVER_IMAGE: (state, action) => {
      state.cover_image_url = action.payload.cover_image_url;
    },
    SET_ACTIVE_USER: (state, action) => {
      // console.log(action.payload);
      const {
        email,
        id,
        name,
        token,
        phone_number,
        cover_image_url,
        avatar_url,
        intro,
      } = action.payload;
      state.isLoggedIn = true;
      state.email = email;
      state.id = id;
      state.name = name;
      state.token = token;
      state.phone_number = phone_number;
      state.avatar_url = avatar_url;
      state.cover_image_url = cover_image_url;
      state.intro = intro;
    },
    REMOVE_ACTIVE_USER(state, action) {
      state.isLoggedIn = false;
      state.email = null;
      state.id = null;
      state.name = null;
      state.token = null;
      state.info = null;
      state.phone_number = null;
      state.cover_image_url = null;
      state.avatar_url = null;
      state.intro = null;
    },
  },
});

export const {
  SET_ACTIVE_USER,
  REMOVE_ACTIVE_USER,
  SET_USER_COVER_IMAGE,
  SET_USER_AVATAR,
  SET_USER_NAME,
} = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectEmail = (state) => state.auth.email;
export const selectUserId = (state) => state.auth.id;
export const selectUserName = (state) => state.auth.name;
export const selectToken = (state) => state.auth.token;
export const selectUserIntro = (state) => state.auth.intro;
export const selectUserAvatar = (state) => state.auth.avatar_url;
export const selectUserCoverImage = (state) => state.cover_image_url;
export const selectUserPhoneNumber = (state) => state.phone_number;
export default authSlice.reducer;
