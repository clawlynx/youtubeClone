import React, { useEffect } from "react";
import { FaHistory } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import LibraryComponent from "../components/LibraryComponent";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import {
  assignLvideos,
  assignWhVideos,
  assignWlVideos,
} from "../features/auth/authSlice";

export default function Library() {
  const { whvideos, wlvideos, lvideos } = useSelector((state) => state.auth);
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
  //function for fetching liked videos
  async function fetchlikedvideos() {
    const { data } = await axios.get("/api/auth/getlwlwhVideos");
    if (data) {
      dispatch(assignLvideos(data.likedVideos));
    } else {
      console.log("no videos");
      dispatch(assignLvideos([]));
    }
  }
  useEffect(() => {
    getHistory();
    fetchsavedvideos();
    fetchlikedvideos();
  }, []);

  return (
    <div className=" min-h-screen history">
      <div className=" p-3 border-b border-neutral-800">
        <div className="flex gap-2 justify-between pb-2 grow border-b border-neutral-800">
          <div className="flex gap-2">
            <FaHistory size={"1.5rem"} />
            <Link to={"/history"} className=" text-xl cursor-pointer">
              History
            </Link>
          </div>
          <Link to={"/history"} className="py-2 text-blue-500 cursor-pointer">
            See All
          </Link>
        </div>
        <LibraryComponent vidarray={whvideos} />
      </div>
      <div className=" p-3 border-b border-neutral-800">
        <div className="flex gap-2 justify-between pb-2 grow border-b border-neutral-800">
          <div className="flex gap-2">
            <MdOutlineWatchLater size={"1.5rem"} />
            <Link to={"/watchlater"} className=" text-xl cursor-pointer">
              Watch Later
            </Link>
          </div>
          <Link
            to={"/watchlater"}
            className="py-2 text-blue-500 cursor-pointer"
          >
            See All
          </Link>
        </div>
        <LibraryComponent vidarray={wlvideos} />
      </div>
      <div className=" p-3 border-b border-neutral-800">
        <div className="flex gap-2 justify-between pb-2 grow border-b border-neutral-800">
          <div className="flex gap-2">
            <AiOutlineLike size={"1.5rem"} />
            <Link to={"/likedvideos"} className=" text-xl cursor-pointer">
              Liked Videos
            </Link>
          </div>
          <Link
            to={"/likedvideos"}
            className="py-2 text-blue-500 cursor-pointer"
          >
            See All
          </Link>
        </div>
        <LibraryComponent vidarray={lvideos} />
      </div>
    </div>
  );
}
