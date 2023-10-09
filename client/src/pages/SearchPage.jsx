import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import SmallVideo from "../components/smallVideo";
import timeElapsed from "../../utilities/datefunction";
import axios from "axios";
import { assignAllVideos } from "../features/videorender/videoRenderSlice";

export default function SearchPage() {
  const { searchQuery } = useParams();
  const { videos } = useSelector((state) => state.videoRender);
  const [searchedVideos, setSearchedVideos] = useState([]);
  const dispatch = useDispatch();

  function searched() {
    const searchedVideos = videos?.filter((item) =>
      item.videoName.toUpperCase().includes(searchQuery.toUpperCase())
    );
    return searchedVideos;
  }

  // function for fetching after refresh
  async function fetchAllVideos() {
    const { data } = await axios.get("/api/video/all");
    if (data) {
      dispatch(assignAllVideos(data));
      console.log(data);
    } else {
      console.log("no videos");
      dispatch(assignAllVideos([]));
    }
  }

  useEffect(() => {
    fetchAllVideos();
    setSearchedVideos(() => searched());
  }, []);
  useEffect(() => {
    setSearchedVideos(() => searched());
  }, [videos]);

  return (
    <div className=" min-h-screen history">
      <p className="p-3 text-3xl border-b border-neutral-800 mb-4">
        Search Results for {searchQuery}
      </p>
      {searchedVideos.length > 0 ? (
        searchedVideos?.map((video) => {
          return (
            <div
              key={video._id}
              className="w-96 px-3 flex gap-5 justify-between history"
            >
              <div className="max-w-sm homevideo">
                <Link
                  to={`/videopage/${video._id}`}
                  className=" cursor-pointer"
                >
                  <SmallVideo
                    vid={`http://localhost:3000/uploads/${video.fileName}`}
                  />
                </Link>
              </div>
              <div className=" py-3 px-2 place-self-center grow">
                <div className="flex justify-start gap-3 items-center">
                  <p className=" p-4 py-2 text-lg bg-green-900 rounded-full">
                    {video?.uploader?.channelName.charAt(0).toUpperCase()}
                  </p>
                  <div>
                    <p className=" text-xl px-2">
                      {" "}
                      {video.videoName.slice(0, 28)}
                    </p>
                    <p className="px-2">{video.videoDescription}</p>
                    <pre className=" px-2 pt-2 text-gray-400">
                      {video?.uploader?.channelName}
                    </pre>
                    <div className="flex px-2 m-0 justify-start gap-3">
                      <p className=" text-gray-400">{video.views} views</p>
                      <p className=" text-gray-400">.</p>
                      <p className=" text-gray-400">
                        {timeElapsed(video?.created)} ago
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <>
          <p>No Videos found</p>
          <Link to={"/"} className=" text-blue-500">
            Go back{" "}
          </Link>
        </>
      )}
    </div>
  );
}
