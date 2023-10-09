import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { hideSuggestion, setCurrentItem } from "../features/search/searchSlice";

export default function SearchList() {
  const { currentItem } = useSelector((state) => state.search);
  const { videos } = useSelector((state) => state.videoRender);

  const [titleArray, setTitleArray] = useState([]);

  function searched() {
    const titleArray = videos?.filter((item) =>
      item.videoName.toUpperCase().includes(currentItem.toUpperCase())
    );
    return titleArray;
  }

  const dispatch = useDispatch();

  function handleClick(item) {
    dispatch(setCurrentItem(item));
    dispatch(hideSuggestion());
  }

  useEffect(() => {
    setTitleArray(() => searched());
  }, [currentItem]);
  return (
    <div className=" absolute bg-neutral-900 text-white w-96 p-2">
      {titleArray &&
        titleArray?.slice(0, 6).map((item) => {
          return (
            <div
              key={item._id}
              className="p-2 hover:bg-black flex items-center gap-2 border-b border-black cursor-pointer"
              onClick={() => handleClick(item.videoName)}
            >
              <GoSearch />
              <p>{item.videoName}</p>
            </div>
          );
        })}
    </div>
  );
}
