import React from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { trueIsSubscribed } from "../features/videorender/videoRenderSlice";

export default function Subscribe({ subscribe }) {
  const dispatch = useDispatch();
  function handleSubscribe() {
    subscribe();
    dispatch(trueIsSubscribed());
  }
  return (
    <div className=" bg-neutral-800 h-screen history absolute top-14 z-50 flex justify-center rounded-md items-start">
      <div className="bg-neutral-900 p-3 mt-16 w-1/3 z-50 text-white flex flex-col rounded-md ">
        <Link
          to={"/"}
          className="text-right self-end cursor-pointer"
          onClick={() => dispatch(trueIsSubscribed())}
        >
          <RxCross2 size={"1.5rem"} />
        </Link>
        <h1 className=" text-3xl font-bold py-3 text-center">
          Restricted Video
        </h1>
        <p className="text-center text-xl">
          Only subscribers are able to view and comment the content
        </p>
        <p className="text-center text-xl">
          Please Subscribe to watch the video
        </p>
        <div
          className="ms-4 mt-10 bg-neutral-700 hover:bg-neutral-800 py-2 px-2 rounded-lg cursor-pointer w-fit self-center"
          onClick={handleSubscribe}
        >
          <p className=" text-3xl">Subscribe</p>
        </div>
      </div>
    </div>
  );
}
