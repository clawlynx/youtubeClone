import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineVideoLibrary,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className=" bg-neutral-900 py-5 px-1 border-e h-screen border-neutral-800">
      <NavLink
        to={"/"}
        className="flex flex-col gap-2 px-3 py-3 hover:bg-neutral-950 rounded justify-center items-center cursor-pointer"
      >
        <AiOutlineHome size={"1.25rem"} />
        <p className=" text-sm">Home</p>
      </NavLink>
      <NavLink
        to={"/explore"}
        className="flex flex-col gap-2 px-3 py-2 hover:bg-neutral-950 rounded justify-center items-center cursor-pointer"
      >
        <MdOutlineExplore size={"1.25rem"} />
        <p className=" text-sm">Explore</p>
      </NavLink>
      <NavLink
        to={"/shorts"}
        className="flex flex-col gap-2 px-3 py-2 hover:bg-neutral-950 rounded justify-center items-center cursor-pointer"
      >
        <img src="/shorts.png" alt="img" width={22}></img>
        <p className=" text-sm">Shorts</p>
      </NavLink>
      <NavLink
        to={"/subscriptions"}
        className="flex flex-col gap-2 px-3 py-2 hover:bg-neutral-950 rounded justify-center items-center cursor-pointer"
      >
        <MdOutlineSubscriptions size={"1.25rem"} />
        <p className=" text-sm">Subscriptions</p>
      </NavLink>
      <NavLink
        to={"/library"}
        className="flex flex-col gap-2 px-3 py-2 hover:bg-neutral-950 rounded justify-center items-center cursor-pointer"
      >
        <MdOutlineVideoLibrary size={"1.25rem"} />
        <p className=" text-sm">Library</p>
      </NavLink>
    </div>
  );
}