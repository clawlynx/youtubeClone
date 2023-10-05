import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
  singleVideo: null,
  isLiked: false,
  isDisliked: false,
  isSaved: false,
  likenos: 2,
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
      state.likenos = state.likenos + 1;
    },
    unmarkLiked: (state) => {
      state.isLiked = false;
      state.likenos = state.likenos - 1;
    },
    toogleDisliked: (state) => {
      state.isDisliked = !state.isDisliked;
    },
    toogleSaved: (state) => {
      state.isSaved = !state.isSaved;
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
  toogleDisliked,
  toogleSaved,
  addComment,
  deleteComment,
  editComment,
  assignAllVideos,
  assignSingleVideo,
} = videoRenderSlice.actions;
export default videoRenderSlice.reducer;
