import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singlevideoPageOn } from "../features/togglesidebar/togglesidebarSlice";
import VideoPageButtons from "../components/VideoPageButtons";
import Comments from "../components/Comments";

export default function SingleVideoPage() {
  const dispatch = useDispatch();
  const { singleVideo } = useSelector((state) => state.videoRender);

  useEffect(() => {
    dispatch(singlevideoPageOn());
  }, []);

  return (
    <div className="ps-28 py-5 flex gap-5 justify-between">
      <div>
        <div className="">
          <video
            className="videodiv"
            src={singleVideo.video_src}
            controls
            autoPlay
          ></video>
        </div>
        <div className=" py-3 px-2">
          <p className=" text-2xl">{singleVideo.title}</p>
          <div className="flex items-center justify-between border-b border-neutral-800">
            <div className=" flex py-3 gap-2">
              <p className=" text-gray-400">10k views</p>
              <p className=" text-gray-400">.</p>
              <p className=" text-gray-400">2 months ago</p>
            </div>
            <VideoPageButtons />
          </div>

          <div className="flex py-2 items-center gap-4 border-b border-neutral-800">
            <p className=" p-4 py-2 text-lg bg-green-900 rounded-full">
              {singleVideo.Uploder.charAt(0).toUpperCase()}
            </p>
            <p className=" text-xl font-bold">{singleVideo.Chanel}</p>
          </div>
          <div className="my-3 py-2 bg-neutral-600 rounded-lg border-b border-neutral-800">
            <p className="px-2 text-gray-300">{singleVideo.description}</p>
          </div>
        </div>
        <div className=" py-3 px-2">
          <h1 className=" text-2xl">Comments</h1>
          <Comments />
        </div>
      </div>
      <div>
        <h2>More videos</h2>
      </div>
    </div>
  );
}
