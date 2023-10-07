import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice";
import togglebarReducer from "./features/togglesidebar/togglesidebarSlice";
import videoRenderReducer from "./features/videorender/videoRenderSlice";
import yourVideosReducer from "./features/yourVideo/yourVideoSlice";
import authReducer from "./features/auth/authSlice";
import channelReducer from "./features/channel/channelSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    toggleSideBar: togglebarReducer,
    videoRender: videoRenderReducer,
    yourVideos: yourVideosReducer,
    channel: channelReducer,
  },
});
