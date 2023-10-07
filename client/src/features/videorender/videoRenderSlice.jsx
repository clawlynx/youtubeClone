import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  singleVideo: null,
  isLiked: false,
  isDisliked: false,
  isSaved: false,

  commentList: [
    {
      id: 1,
      comment: "its good but not booodd",
      user: "kira",
    },
    {
      id: 2,
      comment: "its dgfghghgjhzscdvgdfgdfcsdf booodd",
      user: "jgjjk",
    },
    {
      id: 3,
      comment: "gldfjadhnrnciweegfy good but not booodd",
      user: "sik",
    },
  ],
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
      state.commentList.push(payload);
    },
    deleteComment: (state, { payload }) => {
      state.commentList = state.commentList.filter(
        (item) => item.id !== payload
      );
    },
    editComment: (state, { payload }) => {
      state.commentList = state.commentList.filter(
        (item) => item.id !== payload.id
      );
      state.commentList.push(payload);
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
  deleteComment,
  editComment,
  assignAllVideos,
  assignSingleVideo,
} = videoRenderSlice.actions;
export default videoRenderSlice.reducer;
