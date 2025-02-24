import { createSlice } from "@reduxjs/toolkit";

const feed = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
    removeUserFromFeed: (state, action) => {
      let newArray = state.filter((row) => {
        return row._id != action.payload;
      });
      return newArray;
    },
  },
});
export default feed.reducer;
export const { addFeed, removeUserFromFeed } = feed.actions;
