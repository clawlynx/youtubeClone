import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  singleVideo: null,
  isLiked: false,
  isDisliked: false,
  isSaved: false,

  commentList: [],
};

const videoRenderSlice = createSlice({
  name: "videoRender",
  initialState,
  reducers: {
    markLiked: (state) => {
      state.isLiked = true;
    },
    unmarkLiked: (state) => {
      state.isLiked = false;
    },
    markDisliked: (state) => {
      state.isDisliked = true;
    },
    unmarkDisliked: (state) => {
      state.isDisliked = false;
    },
    markSaved: (state) => {
      state.isSaved = true;
    },
    unmarkSaved: (state) => {
      state.isSaved = false;
    },
    addComment: (state, { payload }) => {
      state.commentList = payload;
      if (state.commentList.length > 0) {
        state.commentList.reverse();
      }
    },

    assignAllVideos: (state, { payload }) => {
      state.videos = payload;
    },
    assignSingleVideo: (state, { payload }) => {
      state.singleVideo = payload;
    },
  },
});

export const {
  markLiked,
  unmarkLiked,
  markDisliked,
  unmarkDisliked,
  markSaved,
  unmarkSaved,
  addComment,
  assignAllVideos,
  assignSingleVideo,
} = videoRenderSlice.actions;
export default videoRenderSlice.reducer;
