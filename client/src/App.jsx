import Home from "./pages/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Library from "./pages/Library";
import HomeVideo from "./pages/HomeVideo";
import WatchHistory from "./pages/WatchHistory";
import LikedVideos from "./pages/LikedVideos";
import WatchLater from "./pages/WatchLater";
import YourVideos from "./pages/YourVideos";
import SingleVideoPage from "./pages/SingleVideoPage";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CreateChannel from "./components/CreateChannel";
import { useSelector } from "react-redux";
import Channel from "./pages/Channel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <HomeVideo />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "history",
        element: <WatchHistory />,
      },
      {
        path: "likedvideos",
        element: <LikedVideos />,
      },
      {
        path: "watchlater",
        element: <WatchLater />,
      },
      {
        path: "myvideos",
        element: <YourVideos />,
      },
      {
        path: "videopage/:id",
        element: <SingleVideoPage />,
      },
      {
        path: "mychannel",
        element: <Channel />,
      },
    ],
  },
  {
    path: "/signin",
    element: <SignInPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
]);

function App() {
  const { createChannel } = useSelector((state) => state.channel);

  return (
    <div className="">
      {createChannel && <CreateChannel />}

      <RouterProvider router={router} />
    </div>
  );
}

export default App;
