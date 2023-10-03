import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import {
  setChannelDetails,
  toggleEditChannel,
} from "../features/channel/channelSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditChannel() {
  const { channelDetails } = useSelector((state) => state.channel);
  const [channelName, setChannelName] = useState(channelDetails?.channelName);
  const [channelDescription, setChannelDescription] = useState(
    channelDetails?.channelDescription
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const channelData = {
      channelName,
      channelDescription,
    };
    const { data } = await axios.patch("/api/channel/edit", channelData);
    if (data) {
      dispatch(setChannelDetails(data));
      console.log("channel updated");
      dispatch(toggleEditChannel());

      navigate("/");
    } else {
      console.log("something Wrong");
    }
  }

  return (
    <div className=" bg-neutral-900/70 h-screen w-screen absolute z-50 flex justify-center items-center">
      <div className="bg-neutral-800 p-3 w-1/3 z-50 text-white flex flex-col rounded-md">
        <div
          className="text-right self-end cursor-pointer"
          onClick={() => dispatch(toggleEditChannel())}
        >
          <RxCross2 size={"1.5rem"} />
        </div>
        <h1 className=" text-3xl font-bold py-3 text-center">
          Edit Your Channel
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
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
