import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  clearPlaylist,
  removeVideofromthis,
} from "../features/watchLater/watchLaterSlice";
import SmallVideo from "../components/smallVideo";

export default function WatchLater() {
  const { wlvideos } = useSelector((state) => state.watchLater);
  const dispatch = useDispatch();
  return (
    <div className="p-2 history">
      <h1 className=" font-bold text-4xl p-2 pb-4 border-b border-neutral-900">
        Your Watch Later shown here
      </h1>
      <div className="mt-3 flex  items-start gap-3">
        <div className="grow">
          <p className=" text-2xl pb-2 px-3 mb-3 border-b border-neutral-900">
            Watch later playlist
          </p>
          {wlvideos.length > 0 ? (
            wlvideos.map((video) => (
              <div
                key={video._id}
                className="mb-2  flex justify-between gap-0 border-b border-neutral-900"
              >
                <div className="flex gap-4">
                  <Link to={`/videopage/${video._id}`} className=" w-96 h-60">
                    <SmallVideo vid={video.video_src} />
                  </Link>
                  <div>
                    <Link
                      to={`/videopage/${video._id}`}
                      className=" text-xl pb-2"
                    >
                      {video.title}
                    </Link>
                    <div className="flex gap-2 pb-4 text-sm text-gray-400">
                      <p>{video.Chanel}</p>
                      <p>.</p>
                      <p>10k views</p>
                    </div>
                    <p>{video.description}</p>
                  </div>
                </div>

                <div className="text-blue-500 flex items-center gap-2">
                  <RxCross1 className=" cursor-pointer" />
                  <p
                    className=" cursor-pointer"
                    onClick={() => dispatch(removeVideofromthis(video._id))}
                  >
                    Remove
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No videos to show</div>
          )}
        </div>
        <div className=" cursor-pointer">
          <p
            className=" text-blue-500"
            onClick={() => dispatch(clearPlaylist())}
          >
            Clear All
          </p>
        </div>
      </div>
    </div>
  );
}