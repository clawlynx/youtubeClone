import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./features/search/searchSlice";
import togglebarReducer from "./features/togglesidebar/togglesidebarSlice";
import videoRenderReducer from "./features/videorender/videoRenderSlice";
import watchHistoryReducer from "./features/history/watchHistorySlice";
import watchLaterReducer from "./features/watchLater/watchLaterSlice";
import likedVideoReducer from "./features/likedvideos/likedVideosSlice";
import yourVideosReducer from "./features/yourVideo/yourVideoSlice";
import authReducer from "./features/auth/authSlice";
import channelReducer from "./features/channel/channelSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    auth: authReducer,
    toggleSideBar: togglebarReducer,
    videoRender: videoRenderReducer,
    watchHistory: watchHistoryReducer,
    watchLater: watchLaterReducer,
    likedVideos: likedVideoReducer,
    yourVideos: yourVideosReducer,
    channel: channelReducer,
  },
});
