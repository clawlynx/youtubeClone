import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { hideSuggestion, setCurrentItem } from "../features/search/searchSlice";

export default function SearchList() {
  const { history, currentItem } = useSelector((state) => state.search);
  const [historyArray, setHistoryArray] = useState([]);

  useEffect(() => {
    setHistoryArray(history);
  }, []);

  useEffect(() => {
    setHistoryArray(() =>
      history.filter((item) =>
        item.toUpperCase().includes(currentItem.toUpperCase())
      )
    );
  }, [currentItem]);

  const dispatch = useDispatch();

  function handleClick(item) {
    dispatch(setCurrentItem(item));
    dispatch(hideSuggestion());
  }

  return (
    <div className=" absolute bg-neutral-900 text-white w-96 p-2">
      {historyArray &&
        historyArray.map((item, index) => {
          return (
            <div
              key={index}
              className="p-2 hover:bg-black flex items-center gap-2 border-b border-black cursor-pointer"
              onClick={() => handleClick(item)}
            >
              <GoSearch />
              <p>{item}</p>
            </div>
          );
        })}
    </div>
  );
}
