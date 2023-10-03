import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SmallVideo from "../components/smallVideo";
import { RxCross1 } from "react-icons/rx";
import {
  clearHistory,
  removeVideo,
} from "../features/history/watchHistorySlice";
import { Link } from "react-router-dom";

export default function WatchHistory() {
  const { whvideos } = useSelector((state) => state.watchHistory);
  const dispatch = useDispatch();

  return (
    <div className="p-2 history">
      <h1 className=" font-bold text-4xl p-2 pb-4 border-b border-neutral-900">
        Your Watch History shown here
      </h1>
      <div className="mt-3 flex  items-start gap-3">
        <div className="grow">
          <p className=" text-2xl pb-2 px-3 mb-3 border-b border-neutral-900">
            History
          </p>
          {whvideos.length > 0 ? (
            whvideos.map((video) => (
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
                    onClick={() => dispatch(removeVideo(video._id))}
                  >
                    Remove
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div>No History to show</div>
          )}
        </div>
        <div className=" cursor-pointer">
          <p
            className=" text-blue-500"
            onClick={() => dispatch(clearHistory())}
          >
            Clear History
          </p>
        </div>
      </div>
    </div>
  );
}
