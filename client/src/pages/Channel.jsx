import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { AiOutlineEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import {
  setChannelVideos,
  toggleEditChannel,
} from "../features/channel/channelSlice";
import { toggleUploadVideo } from "../features/yourVideo/yourVideoSlice";
import { Link } from "react-router-dom";
import SmallVideo from "../components/smallVideo";

export default function Channel() {
  const { channelDetails, channelVideos } = useSelector(
    (state) => state.channel
  );
  const dispatch = useDispatch();
  async function fetchChannelVideos() {
    const { data } = await axios.get("/api/video/find");
    if (data) {
      dispatch(setChannelVideos(data));
      console.log(data);
    } else {
      console.log("no videos");
    }
  }
  useEffect(() => {
    fetchChannelVideos();
  }, []);
  console.log(channelVideos);

  return (
    <div className="p-3 h-screen">
      <div className="flex gap-5 justify-around  border-b border-neutral-900 py-5 mb-3 channelpage">
        <div className="flex flex-col items-center gap-3">
          <p className=" text-7xl text-center bg-green-900 px-4 py-2 rounded-full">
            {channelDetails?.channelName.charAt(0).toUpperCase()}
          </p>
          <div className="text-center">
            <p className=" text-2xl ">{channelDetails?.channelName}</p>
            <p>{channelDetails?.channelDescription}</p>
            <p>Subscribers: {channelDetails?.subscribers}</p>
            <p>Videos: {channelDetails?.totalVideos}</p>
            <p>Total Likes: {channelDetails?.totalLikes}</p>
          </div>
        </div>
        <div className="self-end">
          <button
            className=" flex gap-2 items-center bg-blue-500 p-2 font-bold hover:bg-blue-700 mb-3 w-36"
            onClick={() => dispatch(toggleEditChannel())}
          >
            <AiOutlineEdit />
            Edit Channel
          </button>
          <button
            className=" flex gap-2 items-center bg-blue-500 p-2 font-bold hover:bg-blue-700 w-36"
            onClick={() => dispatch(toggleUploadVideo())}
          >
            <AiOutlineCloudUpload />
            Upload Video
          </button>
        </div>
      </div>
      <div>
        <p className="text-2xl border-b border-neutral-900 py-2 mb-3 flex gap-2 items-center channelpage">
          <GoVideo size={"1.5rem"} />
          Channel Videos
        </p>
        {!(channelVideos.length > 0) && (
          <p className="text-center py-4">No videos to show</p>
        )}
        {channelVideos &&
          channelVideos.map((video) => {
            return (
              <Link
                to={`/videopage/${video._id}`}
                key={video._id}
                className=" w-96 flex justify-start channelpage py-2 border-b border-neutral-900 mb-3"
              >
                <div className="w-1/3">
                  <div className="">
                    <SmallVideo
                      vid={`http://localhost:3000/uploads/${video.fileName}`}
                    />
                  </div>
                </div>
                <div className=" px-4">
                  <div className=" text-2xl py-3 font-bold text-white">
                    {video.videoName}
                  </div>
                  <p className=" text-md">{video.videoDescription}</p>
                  <div className="flex gap-2  py-4 text-sm text-gray-400">
                    <p>10k views</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
