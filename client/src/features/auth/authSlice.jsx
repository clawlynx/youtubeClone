import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    assignUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { assignUser } = authSlice.actions;

export default authSlice.reducer;
