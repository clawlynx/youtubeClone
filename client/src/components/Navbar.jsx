import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import SearchBar from "./SearchBar";
import AccountsSectionNav from "./AccountsSectionNav";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  singlevideoPageOff,
  singlevideoPageOn,
  toggleSideBar,
} from "../features/togglesidebar/togglesidebarSlice";
import { hideSuggestion } from "../features/search/searchSlice";
export default function Navbar() {
  const dispatch = useDispatch();

  function handlehamclick() {
    dispatch(singlevideoPageOff());
    dispatch(toggleSideBar());
  }
  return (
    <div className="flex justify-between items-center py-3 px-5 bg-neutral-900 border-b border-neutral-800 sticky top-0 max-h-20 z-50">
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
          <img src="/logo.ico" alt="logo"></img>
          <div className="px-2 font-bold text-2xl text-white">YouTube</div>
        </Link>
      </div>
      <SearchBar />
      <AccountsSectionNav />
    </div>
  );
}
