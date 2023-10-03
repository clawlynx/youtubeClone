import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isClicked: false,
  currentItem: "",
  history: ["item 1", "python", "java", "javascript", "react", "mongoose"],
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
    setCurrentItem: (state, { payload }) => {
      state.currentItem = payload;
    },
  },
});

export const { showSuggestions, setCurrentItem, hideSuggestion } =
  searchSlice.actions;
export default searchSlice.reducer;
