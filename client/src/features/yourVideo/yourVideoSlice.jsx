import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  yourVideos: [
    {
      _id: 1,
      video_src: "/beast.mp4",
      Chanel: "62bafe6752cea35a6c30685f",
      title: "video 1",
      Uploder: "abc",
      description: "description of  video 1",
    },
    {
      _id: 2,
      video_src: "/beast.mp4",
      Chanel: "cdd",
      title: "video 2",
      Uploder: "abc",
      description: "description of  video 2",
    },
    {
      _id: 3,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 3",
      Uploder: "abc",
      description: "description of  video 3",
    },
    {
      _id: 4,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
    {
      _id: 5,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
  ],
};

const yourVideosSlice = createSlice({
  name: "yourVideos",
  initialState,
  reducers: {
    deleteVideo: (state, { payload }) => {
      state.yourVideos = state.yourVideos.filter(
        (item) => item._id !== payload
      );
    },
  },
});

export const { deleteVideo } = yourVideosSlice.actions;
export default yourVideosSlice.reducer;
