import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallVideo from "../components/smallVideo";
import { Link } from "react-router-dom";
import {
  assignAllVideos,
  trueIsSubscribed,
} from "../features/videorender/videoRenderSlice";
import axios from "axios";
import timeElapsed from "../../utilities/datefunction";
import { singlevideoPageOff } from "../features/togglesidebar/togglesidebarSlice";

const categories = [
  "All",
  "Music",
  "Movies",
  "Songs",
  "Programming",
  "Gaming",
  "Cricket",
  "Football",
  "WWE",
  "Food",
  "Nature",
  "News",
];

export default function HomeVideo() {
  const { videos } = useSelector((state) => state.videoRender);
  const { showBigBar, categoryList } = useSelector(
    (state) => state.toggleSideBar
  );
  const dispatch = useDispatch();

  async function fetchAllVideos() {
    const { data } = await axios.get("/api/video/all");
    if (data) {
      dispatch(assignAllVideos(data));
      console.log(data);
    } else {
      console.log("no videos");
      dispatch(assignAllVideos([]));
    }
  }

  useEffect(() => {
    fetchAllVideos();
    dispatch(singlevideoPageOff());
    dispatch(trueIsSubscribed());
  }, []);

  return (
    <div className="min-h-screen">
      <div className=" flex bg-neutral-950 border-b border-neutral-800 p-2 justify-between mx-0 mb-2 channelpage ">
        {categoryList &&
          categories.map((item) => (
            <p
              className=" px-2 py-1 bg-neutral-900 rounded-lg cursor-pointer hover:bg-neutral-800"
              key={item}
            >
              {item}
            </p>
          ))}
      </div>
      <div
        className={`grid grid-cols-4 p-2 ${showBigBar ? "gap-7" : "gap-16"}`}
      >
        {videos?.map((video) => {
          return (
            <div key={video._id} className="w-96">
              <div className="max-w-sm homevideo">
                <Link
                  to={`/videopage/${video._id}`}
                  className=" cursor-pointer"
                >
                  <SmallVideo
                    vid={`http://localhost:3000/uploads/${video.fileName}`}
                  />
                </Link>
              </div>
              <div className=" py-3 px-2 ">
                <div className="flex justify-start gap-3 items-center">
                  <p className=" p-4 py-2 text-lg bg-green-900 rounded-full">
                    {video?.uploader?.channelName.charAt(0).toUpperCase()}
                  </p>
                  <div>
                    <p className=" text-xl px-2">
                      {" "}
                      {video.videoName.slice(0, 28)}
                    </p>
                    <pre className=" px-2 pt-2 text-gray-400">
                      {video?.uploader?.channelName}
                    </pre>
                    <div className="flex px-2 m-0 justify-start gap-3">
                      <p className=" text-gray-400">{video.views} views</p>
                      <p className=" text-gray-400">.</p>
                      <p className=" text-gray-400">
                        {timeElapsed(video?.created)} ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
