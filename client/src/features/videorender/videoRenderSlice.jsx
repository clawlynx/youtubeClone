import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [
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
    {
      _id: 6,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
    {
      _id: 7,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
    {
      _id: 8,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
    {
      _id: 9,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
    {
      _id: 10,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
    {
      _id: 11,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
    {
      _id: 12,
      video_src: "/beast.mp4",
      Chanel: "add",
      title: "video 4",
      Uploder: "abc",
      description: "description of  video 4",
    },
  ],
  singleVideo: {
    _id: 4,
    video_src: "/beast.mp4",
    Chanel: "add",
    title: "video 4",
    Uploder: "abc",
    description: "description of  video 4",
  },
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
} = videoRenderSlice.actions;
export default videoRenderSlice.reducer;
