import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallVideo from "../components/smallVideo";
import { RxCross1 } from "react-icons/rx";

import { Link } from "react-router-dom";
import axios from "axios";
import { assignWhVideos } from "../features/auth/authSlice";

export default function WatchHistory() {
  const { whvideos, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  //function for initialrender
  async function getHistory() {
    const { data } = await axios.get("/api/auth/getlwlwhVideos");

    if (data) {
      dispatch(assignWhVideos(data.history));
    } else {
      console.log("no history");
      dispatch(assignWhVideos([]));
    }
  }

  //function for removing each
  async function removeHistory(id) {
    if (user?._id) {
      const updata = {
        videoId: id,
        isAdd: "remove",
        userId: user._id,
      };
      const { data } = await axios.patch("/api/auth/updatehistory", updata);
      if (data) {
        dispatch(assignWhVideos(data.history));
      } else {
        console.log("failed to update");
      }
    }
  }

  //function to clearhistory
  async function clearHistory() {
    const { data } = await axios.patch("/api/auth/clearhistory", {
      userId: user?._id,
    });
    if (data) {
      dispatch(assignWhVideos(data.history));
    } else {
      console.log("failed to clear");
    }
  }

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <div className="p-2 history min-h-screen">
      <h1 className=" font-bold text-4xl p-2 pb-4 border-b border-neutral-900">
        Your Watch History shown here
      </h1>
      <div className="mt-3 flex  items-start gap-3">
        <div className="grow">
          <p className=" text-2xl pb-2 px-3 mb-3 border-b border-neutral-900">
            History
          </p>
          {whvideos?.length > 0 ? (
            whvideos.map((video) => (
              <div
                key={video._id}
                className="mb-2  flex justify-between gap-0 py-3 border-b border-neutral-900"
              >
                <div className="flex gap-4">
                  <div className=" max-w-sm homevideo">
                    <Link to={`/videopage/${video._id}`} className=" w-96 h-60">
                      <SmallVideo vid={`/uploads/${video.fileName}`} />
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`/videopage/${video._id}`}
                      className=" text-xl pb-2 mb-2"
                    >
                      {video.videoName}
                    </Link>
                    <div className="flex gap-2 pb-4 mt-2 text-sm text-gray-400">
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
                    onClick={() => removeHistory(video._id)}
                  >
                    Remove
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>{`No History to show (make sure you are logged in)`}</div>
          )}
        </div>
        <div className=" cursor-pointer clearall">
          <p className=" text-blue-500" onClick={clearHistory}>
            Clear History
          </p>
        </div>
      </div>
    </div>
  );
}
