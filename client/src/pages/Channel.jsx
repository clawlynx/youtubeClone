import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEdit, AiOutlineCloudUpload } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import { toggleEditChannel } from "../features/channel/channelSlice";

export default function Channel() {
  const { channelDetails } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  return (
    <div className="p-3">
      <div className="flex gap-5 justify-around  border-b border-neutral-900 py-5 mb-3 channelpage">
        <div className="flex flex-col items-center gap-3">
          <p className=" text-7xl font-bold bg-green-900 px-4 py-2 rounded-full">
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
          <button className=" flex gap-2 items-center bg-blue-500 p-2 font-bold hover:bg-blue-700 w-36">
            <AiOutlineCloudUpload />
            Upload Video
          </button>
        </div>
      </div>
      <div>
        <p className="text-2xl border-b border-neutral-900 py-2 flex gap-2 items-center">
          <GoVideo size={"1.5rem"} />
          Channel Videos
        </p>
        {channelDetails?.videoList ? (
          <p>videos here</p>
        ) : (
          <p className="text-center py-4">No videos to show</p>
        )}
      </div>
    </div>
  );
}
