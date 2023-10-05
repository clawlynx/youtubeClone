import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SmallVideo from "../components/smallVideo";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

import axios from "axios";
import {
  setChannelDetails,
  setChannelVideos,
} from "../features/channel/channelSlice";
import timeElapsed from "../../utilities/datefunction";

export default function YourVideos() {
  const { channelVideos, channelDetails } = useSelector(
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

  async function updateChannel() {
    const { data } = await axios.patch(
      "/api/channel/reducetotalvideos",
      channelDetails
    );
    if (data) {
      dispatch(setChannelDetails(data));
      console.log(data);
    } else {
      console.log("error");
    }
  }

  async function handleDelete(id) {
    const { data } = await axios.delete(`/api/video/delete/${id}`);
    if (data) {
      console.log(data);
      updateChannel();
      fetchChannelVideos();
    } else {
      console.log("unable to delete");
    }
  }

  return (
    <>
      <div className="p-2 history min-h-screen">
        <h1 className=" font-bold text-4xl p-2 pb-4 border-b border-neutral-900">
          Your Videos
        </h1>
        <div className="mt-3 flex  items-start gap-3">
          <div className="grow">
            <p className=" text-2xl pb-2 px-3 mb-3 border-b border-neutral-900">
              All Videos
            </p>
            {channelVideos?.length > 0 ? (
              channelVideos.map((video) => (
                <div
                  key={video._id}
                  className="mb-2  flex justify-between gap-0 pb-3 border-b border-neutral-900"
                >
                  <div className="flex gap-4">
                    <div className=" max-w-sm">
                      <Link to={`/videopage/${video._id}`} className="">
                        <SmallVideo
                          vid={`http://localhost:3000/uploads/${video.fileName}`}
                        />
                      </Link>
                    </div>

                    <div>
                      <Link
                        to={`/videopage/${video._id}`}
                        className=" text-xl pb-2"
                      >
                        {video.videoName}
                      </Link>
                      <div className="flex gap-2 pb-4 text-sm text-gray-400">
                        <p>{timeElapsed(video.created)} ago</p>
                        <p>.</p>
                        <p>{video.views} views</p>
                      </div>
                      <p>{video.videoDescription}</p>
                    </div>
                  </div>

                  <div className="text-blue-500 flex items-center gap-2">
                    <MdDelete className=" cursor-pointer" />
                    <p
                      className=" cursor-pointer"
                      onClick={() => handleDelete(video._id)}
                    >
                      Delete
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div>No videos to show</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
