import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadVideo: false,
};

const yourVideosSlice = createSlice({
  name: "yourVideos",
  initialState,
  reducers: {
    toggleUploadVideo: (state, { payload }) => {
      state.uploadVideo = !state.uploadVideo;
    },
    setYourVideos: (state, { payload }) => {
      state.yourVideos = payload;
    },
  },
});

export const { deleteVideo, toggleUploadVideo, setYourVideos } =
  yourVideosSlice.actions;
export default yourVideosSlice.reducer;
