import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createChannel: false,
  editChannel: false,
  hasChannel: false,
  channelDetails: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    toggleCreateChannel: (state) => {
      state.createChannel = !state.createChannel;
    },
    toggleHasChannel: (state) => {
      state.hasChannel = !state.hasChannel;
    },
    channelok: (state) => {
      state.hasChannel = true;
    },
    setChannelDetails: (state, { payload }) => {
      state.channelDetails = payload;
    },
    toggleEditChannel: (state) => {
      state.editChannel = !state.editChannel;
    },
  },
});

export const {
  toggleCreateChannel,
  toggleHasChannel,
  channelok,
  setChannelDetails,
  toggleEditChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
