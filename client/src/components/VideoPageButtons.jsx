import React from "react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";
import { PiShareFat } from "react-icons/pi";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  markLiked,
  toogleDisliked,
  toogleSaved,
  unmarkLiked,
} from "../features/videorender/videoRenderSlice";

export default function VideoPageButtons() {
  const { isLiked, isDisliked, isSaved, likenos } = useSelector(
    (state) => state.videoRender
  );
  const dispatch = useDispatch();
  return (
    <div className=" flex gap-2 mb-1">
      {isLiked ? (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={() => dispatch(unmarkLiked())}
        >
          <AiFillLike size={"1.75rem"} className=" fill-blue-500" />
          <p>Liked</p>
          <p className=" border-s ps-2">{likenos}</p>
        </div>
      ) : (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={() => dispatch(markLiked())}
        >
          <AiOutlineLike size={"1.75rem"} />
          <p>Like</p>
          <p className=" border-s ps-2">{likenos}</p>
        </div>
      )}
      {isDisliked ? (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={() => dispatch(toogleDisliked())}
        >
          <AiFillDislike size={"1.75rem"} className=" fill-blue-500" />
          <p>Disliked</p>
        </div>
      ) : (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={() => dispatch(toogleDisliked())}
        >
          <AiOutlineDislike size={"1.75rem"} />
          <p>Dislike</p>
        </div>
      )}
      {isSaved ? (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={() => dispatch(toogleSaved())}
        >
          <MdPlaylistAddCheck className=" text-blue-500" size={"1.75rem"} />
          <p>Saved</p>
        </div>
      ) : (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={() => dispatch(toogleSaved())}
        >
          <MdPlaylistAdd size={"1.75rem"} />
          <p>Save</p>
        </div>
      )}

      <div className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer">
        <PiShareFat size={"1.75rem"} />
        <p>Share</p>
      </div>
      <div className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer">
        <BsThreeDots size={"1.75rem"} />
      </div>
    </div>
  );
}
