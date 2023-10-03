import React from "react";
import { useSelector } from "react-redux";
import SmallVideo from "../components/smallVideo";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Music",
  "Movies",
  "Songs",
  "Programming",
  "Gaming",
  "Cricket",
  "Football",
  "WWE",
  "Food",
  "Nature",
  "News",
];

export default function HomeVideo() {
  const { videos } = useSelector((state) => state.videoRender);
  const { showBigBar } = useSelector((state) => state.toggleSideBar);

  console.log(videos);
  return (
    <>
      <div className=" flex bg-neutral-950 border-b border-neutral-800 p-2 justify-between mx-0 mb-2 negz">
        {categories.map((item) => (
          <p
            className=" px-2 py-1 bg-neutral-900 rounded-lg cursor-pointer hover:bg-neutral-800"
            key={item}
          >
            {item}
          </p>
        ))}
      </div>
      <div
        className={`grid grid-cols-4 p-2 ${showBigBar ? "gap-7" : "gap-16"}`}
      >
        {videos?.map((video) => {
          return (
            <div key={video._id} className=" w-96">
              <Link to={`/videopage/${video._id}`} className=" cursor-pointer">
                <SmallVideo vid={video.video_src} />
              </Link>
              <div className=" py-3 px-2 ">
                <div className="flex justify-start gap-3 items-center">
                  <p className=" p-4 py-2 text-lg bg-green-900 rounded-full">
                    {video?.Uploder?.charAt(0).toUpperCase()}
                  </p>
                  <div>
                    <p className=" text-xl px-2"> {video.title}</p>
                    <pre className=" px-2 pt-2 text-gray-400">
                      {video.Chanel}
                    </pre>
                    <div className="flex px-2 m-0 justify-start gap-3">
                      <p className=" text-gray-400">10k views</p>
                      <p className=" text-gray-400">.</p>
                      <p className=" text-gray-400">2 months ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
