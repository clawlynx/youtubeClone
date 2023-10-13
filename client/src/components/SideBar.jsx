import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineVideoLibrary,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleCategory } from "../features/togglesidebar/togglesidebarSlice";

export default function SideBar() {
  const dispatch = useDispatch();
  return (
    <div className=" bg-neutral-900 sm:py-5 py-1 px-1 border-e sm:h-screen h-fit sm:block flex justify-between border-neutral-800">
      <NavLink
        to={"/"}
        className="flex flex-col gap-2 px-3 py-3 hover:bg-neutral-950 rounded justify-center items-center cursor-pointer"
      >
        <AiOutlineHome size={"1.25rem"} />
        <p className=" text-sm">Home</p>
      </NavLink>
      <div
        className="flex flex-col gap-2 px-3 py-2 hover:bg-neutral-950 rounded justify-center items-center cursor-pointer"
        onClick={() => dispatch(toggleCategory())}
      >
        <MdOutlineExplore size={"1.25rem"} />
        <p className=" text-sm">Explore</p>
      </div>
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
