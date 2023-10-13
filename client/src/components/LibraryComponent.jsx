import React from "react";
import { Link } from "react-router-dom";
import SmallVideo from "./smallVideo";
import { useSelector } from "react-redux";
import timeElapsed from "../../utilities/datefunction";

export default function LibraryComponent({ vidarray }) {
  const { singleVideoPage } = useSelector((state) => state.toggleSideBar);
  return (
    <div className="py-4">
      {vidarray?.length > 0 ? (
        <>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${
              singleVideoPage ? "gap-20" : "gap-5"
            } `}
          >
            {vidarray.slice(0, 4).map((video) => (
              <div key={video._id} className=" w-96">
                <Link to={`/videopage/${video._id}`}>
                  <SmallVideo vid={`/uploads/${video.fileName}`} />
                </Link>

                <Link
                  to={`/videopage/${video._id}`}
                  className="p-2 text-xl mt-3"
                >
                  {video.videoName}
                </Link>
                <div className="flex gap-2 px-2 py-4 text-sm text-gray-400">
                  <p>{timeElapsed(video.created)} ago</p>
                  <p>.</p>
                  <p>{video.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>{`No Videos to show (make sure you are logged in)`}</div>
      )}
    </div>
  );
}
