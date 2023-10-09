import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClicked: false,
  videoTitles: [],

  currentItem: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    showSuggestions: (state) => {
      state.isClicked = true;
    },
    hideSuggestion: (state) => {
      state.isClicked = false;
    },
    toggleSuggestion: (state) => {
      state.isClicked = !state.isClicked;
    },
    assignVideoTitles: (state, { payload }) => {
      state.videoTitles = payload;
    },
    setCurrentItem: (state, { payload }) => {
      state.currentItem = payload;
    },
  },
});

export const {
  showSuggestions,
  assignVideoTitles,
  toggleSuggestion,
  setCurrentItem,
  hideSuggestion,
} = searchSlice.actions;
export default searchSlice.reducer;
