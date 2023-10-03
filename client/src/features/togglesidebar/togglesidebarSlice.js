import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showBigBar: true,
  singleVideoPage: false,
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
  },
});

export const { toggleSideBar, singlevideoPageOn, singlevideoPageOff } =
  toggleBarSlice.actions;
export default toggleBarSlice.reducer;
