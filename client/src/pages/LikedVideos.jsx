import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SmallVideo from "../components/smallVideo";
import axios from "axios";
import { assignLvideos } from "../features/auth/authSlice";

export default function LikedVideos() {
  const { lvideos } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  console.log(lvideos);

  //function for fetching liked videos
  async function fetchlikedvideos() {
    const { data } = await axios.get("/api/auth/getlwlwhVideos");
    if (data) {
      dispatch(assignLvideos(data.likedVideos));
    } else {
      console.log("no videos");
    }
  }
  useEffect(() => {
    fetchlikedvideos();
  }, []);
  return (
    <div className="p-2 history min-h-screen">
      <h1 className=" font-bold text-4xl p-2 pb-4 border-b border-neutral-900">
        Your Liked videos shown here
      </h1>
      <div className="mt-3 flex  items-start gap-3">
        <div className="grow">
          <p className=" text-2xl pb-2 px-3 mb-3 border-b border-neutral-900">
            Liked Videos
          </p>
          {lvideos.length > 0 ? (
            lvideos.map((video) => (
              <div
                key={video._id}
                className="mb-2  flex justify-between gap-0 pb-3 border-b border-neutral-900"
              >
                <div className="flex gap-4">
                  <div className="max-w-sm">
                    <Link to={`/videopage/${video._id}`} className=" w-96 h-60">
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
                      <p>{video.videoLikes} likes</p>
                      <p>.</p>
                      <p>{video.views} views</p>
                    </div>
                    <p>{video.videoDescription}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <p>{`No videos to show (make sure you are logged in)`}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
