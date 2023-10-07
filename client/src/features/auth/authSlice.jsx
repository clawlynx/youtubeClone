import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  likedVideos: [],
  lvideos: [],
  wlvideos: [],
  whvideos: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    assignUser: (state, { payload }) => {
      state.user = payload;
      state.likedVideos = payload?.likedVideos;
    },
    assignLvideos: (state, { payload }) => {
      state.lvideos = payload;
      if (state.lvideos.length > 0) {
        state.lvideos.reverse();
      }
    },
    assignWlVideos: (state, { payload }) => {
      state.wlvideos = payload;
      if (state.wlvideos.length > 0) {
        state.wlvideos.reverse();
      }
    },
    assignWhVideos: (state, { payload }) => {
      state.whvideos = payload;
      if (state.whvideos.length > 0) {
        state.whvideos.reverse();
      }
    },
  },
});

export const { assignUser, assignLvideos, assignWlVideos, assignWhVideos } =
  authSlice.actions;

export default authSlice.reducer;
