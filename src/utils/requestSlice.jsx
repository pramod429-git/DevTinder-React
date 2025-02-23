import { createSlice } from "@reduxjs/toolkit";

const requests = createSlice({
  name: "requests",
  initialState: [],
  reducers: {
    addRequests: (state, action) => action.payload,
    removeRequest: (state, action) => {
      const removedRequest = state.filter(
        (request) => request._id != action.payload
      );
      return removedRequest;
    },
  },
});

export const { addRequests, removeRequest } = requests.actions;
export default requests.reducer;
