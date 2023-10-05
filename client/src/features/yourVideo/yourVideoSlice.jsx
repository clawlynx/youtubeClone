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
  },
});

export const { toggleUploadVideo } = yourVideosSlice.actions;
export default yourVideosSlice.reducer;
