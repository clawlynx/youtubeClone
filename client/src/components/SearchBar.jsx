import React from "react";
import { GoSearch } from "react-icons/go";
import { BsFillMicFill } from "react-icons/bs";
import SearchList from "./SearchList";
import { useDispatch, useSelector } from "react-redux";
import {
  hideSuggestion,
  setCurrentItem,
  toggleSuggestion,
} from "../features/search/searchSlice";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const { isClicked, currentItem } = useSelector((state) => state.search);

  const dispatch = useDispatch();

  async function handleSearch() {
    dispatch(hideSuggestion());
    dispatch(setCurrentItem(""));
  }

  function handleChange(e) {
    dispatch(setCurrentItem(e.target.value));
  }

  return (
    <>
      <div className=" flex h-fit p-2">
        <div className="">
          <input
            type="text"
            onClick={() => dispatch(toggleSuggestion())}
            onChange={(e) => handleChange(e)}
            className=" p-2 sm:w-auto lg:w-80 xl:w-96 bg-neutral-950 text-white rounded"
            value={currentItem}
            placeholder="Search.."
          ></input>
          {isClicked && <SearchList />}
        </div>
        <Link
          to={`/search/${currentItem}`}
          className="bg-neutral-700 hover:bg-neutral-800 sm:mx-2 mx-0 flex items-center rounded cursor-pointer"
          onClick={handleSearch}
        >
          <GoSearch className="p-2 " color="white" size={"2rem"} />
        </Link>
        <div className="bg-neutral-700  hidden hover:bg-neutral-800 mx-2 rounded-full sm:flex items-center cursor-pointer">
          <BsFillMicFill className="p-2" color="white" size={"2rem"} />
        </div>
      </div>
    </>
  );
}
