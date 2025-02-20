import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userState: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.userState = action.payload;
      // return action.payload;
    },
    removeUser: (state) => {
      state.userState = null;
      // return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
