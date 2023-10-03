import React from "react";
import {
  AiOutlineHome,
  AiOutlinePlaySquare,
  AiOutlineLike,
} from "react-icons/ai";
import { FaHistory } from "react-icons/fa";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineWatchLater,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { Link, NavLink } from "react-router-dom";

export default function BigSideBar() {
  return (
    <div className=" bg-neutral-900 py-5 px-1 border-e border-neutral-800 overflow-y-auto h-full bigsidebar">
      <div className=" border-b border-neutral-800 pb-2">
        <NavLink
          to={"/"}
          className=" flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer"
        >
          <AiOutlineHome size={"1.75rem"} />
          <p className="text-lg">Home</p>
        </NavLink>
        <div className=" flex gap-2 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <MdOutlineExplore size={"1.75rem"} />
          <p className="text-lg">Explore</p>
        </div>
        <div className=" flex gap-2 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <img src="/shorts.png" alt="image" width={28}></img>
          <p className="text-lg">Shorts</p>
        </div>
        <div className=" flex gap-2 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <MdOutlineSubscriptions size={"1.75rem"} />
          <p className="text-lg">Subscriptions</p>
        </div>
      </div>
      <div className=" border-b border-neutral-800 pb-2 pt-2">
        <NavLink
          to={"/library"}
          className=" flex gap-2 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer"
        >
          <MdOutlineVideoLibrary size={"1.75rem"} />
          <p className="text-lg">Library</p>
        </NavLink>
        <NavLink
          to={"/history"}
          className=" flex gap-2 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer"
        >
          <FaHistory size={"1.75rem"} />
          <p className="text-lg">History</p>
        </NavLink>
        <NavLink
          to={"/myvideos"}
          className=" flex gap-2 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer"
        >
          <AiOutlinePlaySquare size={"1.75rem"} />
          <p className="text-lg">Your Videos</p>
        </NavLink>
        <NavLink
          to={"/watchlater"}
          className=" flex gap-2 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer"
        >
          <MdOutlineWatchLater size={"1.75rem"} />
          <p className="text-lg">Watch Later</p>
        </NavLink>
        <NavLink
          to={"/likedvideos"}
          className=" flex gap-2 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer"
        >
          <AiOutlineLike size={"1.75rem"} />
          <p className="text-lg">Liked Videos</p>
        </NavLink>
      </div>
      <div>
        <p className="p-3 text-lg tracking-wider border-b border-neutral-800">
          SUBSCRIPTIONS
        </p>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
        <div className="flex gap-3 p-3 pb-4 items-center hover:bg-neutral-950 cursor-pointer">
          <p className="p-2 px-3 bg-neutral-800 rounded-full">C</p>
          <p className="text-lg">Channel</p>
        </div>
      </div>
    </div>
  );
}
