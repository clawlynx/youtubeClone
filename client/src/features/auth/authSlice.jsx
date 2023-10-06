import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  likedVideos: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    assignUser: (state, { payload }) => {
      state.user = payload;
      state.likedVideos = payload.likedVideos;
    },
  },
});

export const { assignUser } = authSlice.actions;

export default authSlice.reducer;
