import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  users: [],
  followers: [],
  followees: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    STORE_USERS(state, action) {
      state.users = action.payload.users;
    },
    STORE_FOLLOWERS(state, action) {
      state.followers = action.payload.followers;
    },
    STORE_FOLLOWEES(state, action) {
      state.followees = action.payload.followees;
    },
  },
});
export const { STORE_USERS, STORE_FOLLOWEES, STORE_FOLLOWERS } =
  userSlice.actions;
export const selectUsers = (state) => state.user.users;
export const selectFollowees = (state) => state.user.followees;
export const selectFollowers = (state) => state.user.followers;
export default userSlice.reducer;
