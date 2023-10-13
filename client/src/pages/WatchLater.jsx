import React, { useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SmallVideo from "../components/smallVideo";
import axios from "axios";
import { assignUser, assignWlVideos } from "../features/auth/authSlice";

export default function WatchLater() {
  const { wlvideos, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //function for removing from watch later

  async function removeSaved(id) {
    if (user?._id) {
      const updata = {
        videoId: id,
        isAdd: "remove",
        userId: user._id,
      };
      const { data } = await axios.patch(
        "/api/buttonactions/updateWatchLater",
        updata
      );
      if (data) {
        dispatch(assignUser(data));
        fetchsavedvideos();
      } else {
        console.log("failed to update");
      }
    }
  }

  //function for removing all videos
  async function removeAll() {
    if (user._id) {
      const updata = {
        userId: user._id,
      };
      const { data } = await axios.patch("/api/auth/removewatchlater", updata);
      if (data) {
        dispatch(assignUser(data));
        fetchsavedvideos();
      } else {
        console.log("failed to remove");
      }
    }
  }

  //function for fetching saved videos
  async function fetchsavedvideos() {
    const { data } = await axios.get("/api/auth/getlwlwhVideos");
    if (data) {
      dispatch(assignWlVideos(data?.watchLater));
    } else {
      console.log("no videos");
      dispatch(assignWlVideos([]));
    }
  }
  useEffect(() => {
    fetchsavedvideos();
  }, []);

  return (
    <div className="p-2 history min-h-screen">
      <h1 className=" font-bold lg:text-4xl text-xl p-2 pb-4 border-b border-neutral-900">
        Your Watch Later shown here
      </h1>
      <div className="mt-3 flex  items-start gap-3 md:flex-row flex-col-reverse">
        <div className="grow">
          <p className=" text-2xl pb-2 px-3 mb-3 border-b border-neutral-900">
            Watch later playlist
          </p>
          {wlvideos?.length > 0 ? (
            wlvideos.map((video) => (
              <div
                key={video._id}
                className="mb-2  flex justify-between gap-0 border-b pb-3 border-neutral-900 sm:flex-row flex-col"
              >
                <div className="flex md:items-center items-start gap-4 md:flex-row flex-col">
                  <div className=" max-w-sm homevideo">
                    <Link to={`/videopage/${video._id}`} className=" w-96 h-60">
                      <SmallVideo vid={`/uploads/${video.fileName}`} />
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
                      <p>{video.videoLikes} likes</p>
                      <p>.</p>
                      <p>{video.views} views</p>
                    </div>
                    <p>{video.videoDescription}</p>
                  </div>
                </div>

                <div className="text-blue-500 flex items-center gap-2">
                  <RxCross1 className=" cursor-pointer" />
                  <p
                    className=" cursor-pointer"
                    onClick={() => removeSaved(video._id)}
                  >
                    Remove
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>{`No videos to show (make sure you are logged in)`}</div>
          )}
        </div>
        <div className=" cursor-pointer clearall">
          <p className=" text-blue-500" onClick={removeAll}>
            Clear All
          </p>
        </div>
      </div>
    </div>
  );
}
