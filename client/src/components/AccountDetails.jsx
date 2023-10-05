import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignUser } from "../features/auth/authSlice";
import axios from "axios";
import {
  setChannelVideos,
  toggleCreateChannel,
} from "../features/channel/channelSlice";
import { Link, useNavigate } from "react-router-dom";

export default function AccountDetails({ drop }) {
  const { user } = useSelector((state) => state.auth);
  const { hasChannel, channelDetails } = useSelector((state) => state.channel);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSignOut(e) {
    e.stopPropagation();
    const { data } = await axios.get("/api/auth/signout");
    if (data) {
      dispatch(assignUser(null));
      dispatch(setChannelVideos(null));
      drop(false);
      navigate("/");
    } else {
      console.log("something went wrong");
    }
  }
  return (
    <div className="z-50">
      <div className="absolute right-5 top-20 bg-neutral-800 p-2 w-80 rounded-sm border border-neutral-900 h-fit">
        <div className="text-center flex flex-col items-center text-white gap-3 border-b border-neutral-700 pb-2">
          {user.image ? (
            <div className=" rounded-full overflow-hidden w-20">
              <img src={user.image} alt="img"></img>
            </div>
          ) : (
            <h3 className="text-black font-bold text-5xl rounded-full  bg-green-900 px-4 py-1 ">
              {user.email.charAt(0).toUpperCase()}
            </h3>
          )}
          <p className="text-2xl">Helloo {user.username}</p>
        </div>
        {hasChannel ? (
          <>
            <div className="text-center text-white py-2 border-b border-neutral-700">
              <p className="text-xl pb-2 border-b border-neutral-700">
                {channelDetails?.channelName}
              </p>
              <p>Subscribers: {channelDetails?.subscribers}</p>
              <p>videos: {channelDetails?.totalVideos}</p>
              <p>Likes: {channelDetails?.totalLikes}</p>
            </div>
            <div className="py-2 border-b border-neutral-700 flex justify-center">
              <Link
                to={"/mychannel"}
                className="bg-blue-500 p-2 w-full text-center  text-white hover:bg-blue-700"
                onClick={() => drop(false)}
              >
                View Channel
              </Link>
            </div>
          </>
        ) : (
          <div className="py-2 border-b border-neutral-700">
            <button
              className="bg-blue-500 p-2 w-full text-white hover:bg-blue-700"
              onClick={() => {
                dispatch(toggleCreateChannel());
                drop(false);
              }}
            >
              Create Channel
            </button>
          </div>
        )}
        <div className="py-4 pt-6">
          <button
            onClick={handleSignOut}
            className="bg-neutral-500 p-2 w-full text-white hover:bg-neutral-600 z-50 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
