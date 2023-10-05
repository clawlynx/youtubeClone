import React from "react";
import { Link } from "react-router-dom";
import SmallVideo from "./smallVideo";
import { useSelector } from "react-redux";

export default function LibraryComponent({ vidarray }) {
  const { singleVideoPage } = useSelector((state) => state.toggleSideBar);
  return (
    <div className="py-4">
      {vidarray.length > 0 ? (
        <>
          <div className={`flex ${singleVideoPage ? "gap-20" : "gap-5"} `}>
            {vidarray.slice(0, 4).map((video) => (
              <div key={video._id} className=" w-96">
                <Link to={`/videopage/${video._id}`}>
                  <SmallVideo vid={video.video_src} />
                </Link>

                <Link to={`/videopage/${video._id}`} className="p-2 text-xl">
                  {video.title}
                </Link>
                <div className="flex gap-2 px-2 py-4 text-sm text-gray-400">
                  <p>{video.Chanel}</p>
                  <p>.</p>
                  <p>10k views</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>No Videos to show</>
      )}
    </div>
  );
}
