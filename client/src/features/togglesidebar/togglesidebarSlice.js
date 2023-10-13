import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showBigBar: true,
  singleVideoPage: false,
  categoryList: false,
};

const toggleBarSlice = createSlice({
  name: "toggleSideBar",
  initialState,
  reducers: {
    toggleSideBar: (state) => {
      state.showBigBar = !state.showBigBar;
    },
    singlevideoPageOn: (state) => {
      state.singleVideoPage = true;
    },
    singlevideoPageOff: (state) => {
      state.singleVideoPage = false;
    },
    toggleCategory: (state) => {
      state.categoryList = !state.categoryList;
    },
  },
});

export const {
  toggleSideBar,
  singlevideoPageOn,
  singlevideoPageOff,
  toggleCategory,
} = toggleBarSlice.actions;
export default toggleBarSlice.reducer;
