import React from "react";
import { GoSearch } from "react-icons/go";
import { BsFillMicFill } from "react-icons/bs";
import SearchList from "./SearchList";
import { useDispatch, useSelector } from "react-redux";
import {
  hideSuggestion,
  setCurrentItem,
  showSuggestions,
} from "../features/search/searchSlice";

export default function SearchBar() {
  const { isClicked, currentItem, history } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  function handleSearch() {
    dispatch(hideSuggestion());
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
            onClick={() => dispatch(showSuggestions())}
            onChange={(e) => handleChange(e)}
            className=" p-2 w-96 bg-neutral-950 text-white rounded"
            value={currentItem}
            placeholder="Search.."
          ></input>
          {isClicked && <SearchList />}
        </div>
        <div
          className="bg-neutral-700 hover:bg-neutral-800 mx-2 flex items-center rounded cursor-pointer"
          onClick={handleSearch}
        >
          <GoSearch className="p-2" color="white" size={"2rem"} />
        </div>
        <div className="bg-neutral-700 hover:bg-neutral-800 mx-2 rounded-full flex items-center cursor-pointer">
          <BsFillMicFill className="p-2" color="white" size={"2rem"} />
        </div>
      </div>
    </>
  );
}
