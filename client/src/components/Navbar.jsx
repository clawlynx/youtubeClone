import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchBar from "./SearchBar";
import AccountsSectionNav from "./AccountsSectionNav";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  singlevideoPageOff,
  toggleSideBar,
} from "../features/togglesidebar/togglesidebarSlice";

export default function Navbar() {
  const dispatch = useDispatch();

  function handlehamclick() {
    dispatch(singlevideoPageOff());
    dispatch(toggleSideBar());
  }
  return (
    <div className="flex justify-between items-center py-3 px-5 bg-neutral-900 border-b border-neutral-800 sticky top-0 max-h-24  z-50">
      <div className=" flex gap-2 justify-center items-center">
        <div className="cursor-pointer">
          <RxHamburgerMenu
            size={"2.5rem"}
            color="white"
            onClick={handlehamclick}
          />
        </div>
        <Link
          to={"/"}
          className=" flex justify-center items-center px-2 cursor-pointer"
          onClick={() => dispatch(singlevideoPageOff())}
        >
          <img src="/logo.ico" alt="logo" className="h-14 w-14"></img>
          <div className="px-2 sm:block hidden font-bold md:text-lg lg:text-2xl text-white">
            YouTube
          </div>
        </Link>
      </div>
      <div className="sm:block hidden">
        <SearchBar />
      </div>
      <div className=" flex sm:gap-5  sm:justify-between sm:flex-row flex-col-reverse items-end justify-end gap-0">
        <div className=" sm:hidden block">
          <SearchBar />
        </div>

        <AccountsSectionNav />
      </div>
    </div>
  );
}
