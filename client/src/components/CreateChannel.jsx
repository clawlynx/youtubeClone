import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  setChannelDetails,
  toggleCreateChannel,
  toggleHasChannel,
} from "../features/channel/channelSlice";
import axios from "axios";
import { toast } from "react-toastify";

export default function CreateChannel() {
  const dispatch = useDispatch();

  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");

  // function for creating the channel
  async function handleSubmit(e) {
    e.preventDefault();
    const channelData = {
      channelName,
      channelDescription,
    };
    const { data } = await axios.post("/api/channel/create", channelData);

    if (data) {
      console.log("channel created");
      dispatch(setChannelDetails(data));
      dispatch(toggleCreateChannel());
      dispatch(toggleHasChannel());
      toast.success("channel created");
    } else {
      console.log("something Wrong");
    }
  }

  return (
    <div className=" bg-neutral-900/70 h-screen w-screen absolute z-50 flex justify-center items-center">
      <div className="bg-neutral-800 p-3 lg:w-1/3 w-3/4  z-50 text-white flex flex-col rounded-md">
        <div
          className="text-right self-end cursor-pointer"
          onClick={() => dispatch(toggleCreateChannel())}
        >
          <RxCross2 size={"1.5rem"} />
        </div>
        <h1 className=" text-3xl font-bold py-3 text-center">
          Create Your Channel
        </h1>
        <form className="py-2" onSubmit={handleSubmit}>
          <p className="py-2 text-lg">Name of Your Channel</p>
          <input
            type="text"
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            className="w-full p-1 rounded-md bg-neutral-900 mb-2"
            placeholder="Name"
            required
          ></input>
          <p className="py-2 text-lg">Description for Channel</p>
          <textarea
            className="w-full p-1 rounded-md bg-neutral-900"
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            rows={12}
            placeholder="your description"
            required
          ></textarea>
          <button
            type="submit"
            className="p-2 bg-sky-500 w-full rounded-md mt-3 hover:bg-sky-700"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
