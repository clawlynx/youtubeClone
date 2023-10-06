import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "react-router-dom";
import { toggleUploadVideo } from "../features/yourVideo/yourVideoSlice";
import axios from "axios";
import {
  setChannelDetails,
  setChannelVideos,
} from "../features/channel/channelSlice";
import { toast } from "react-toastify";

export default function UploadVideo() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isUploading = navigation.state === "submitting";
  const { channelDetails } = useSelector((state) => state.channel);
  const [videoFile, setVideoFile] = useState("");
  const [videoName, setVideoName] = useState("");
  const [videoDescription, setVideoDescription] = useState("");

  async function fetchChannelVideos() {
    const { data } = await axios.get("/api/video/find");
    if (data) {
      dispatch(setChannelVideos(data));
      console.log(data);
    } else {
      console.log("no videos");
    }
  }

  async function updateChannel() {
    const { data } = await axios.patch(
      "/api/channel/updatetotalvideos",
      channelDetails
    );
    if (data) {
      dispatch(setChannelDetails(data));
      console.log(data);
    } else {
      console.log("error");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (videoFile.size < 5000000) {
      const fileData = new FormData();
      fileData.append("file", videoFile);
      fileData.append("videoName", videoName);
      fileData.append("videoDescription", videoDescription);
      fileData.append("uploader", channelDetails?._id);
      const { data } = await axios.post("/api/video/create", fileData);
      if (data) {
        console.log(data);
        dispatch(toggleUploadVideo());
        fetchChannelVideos();
        updateChannel();
        toast.success("successfully uploaded. please wait for sometime");
      } else {
        console.log("error");
      }
    } else {
      alert("please upload video less than 5 mb");
    }
  }

  return (
    <div className=" bg-neutral-900/70 h-screen w-screen absolute z-50 flex justify-center items-center">
      <div className="bg-neutral-800 p-3 w-1/3 z-50 text-white flex flex-col rounded-md">
        <div
          className="text-right self-end cursor-pointer"
          onClick={() => dispatch(toggleUploadVideo())}
        >
          <RxCross2 size={"1.5rem"} />
        </div>
        <h1 className=" text-3xl font-bold py-3 text-center">
          Upload Your Video
        </h1>
        <form className="py-2" onSubmit={handleSubmit}>
          <p className="py-2 text-lg">Name of Your Video</p>
          <input
            type="text"
            value={videoName}
            onChange={(e) => setVideoName(e.target.value)}
            className="w-full p-1 rounded-md bg-neutral-900 mb-2"
            placeholder="Name"
            required
          ></input>
          <p className="py-2 text-lg">Description for Your Video</p>
          <textarea
            className="w-full p-1 rounded-md bg-neutral-900"
            value={videoDescription}
            onChange={(e) => setVideoDescription(e.target.value)}
            rows={5}
            placeholder="your description"
            required
          ></textarea>
          <p className="py-2 text-lg">Choose a File</p>
          <input
            className=" p-1 rounded-md bg-neutral-900"
            type="file"
            accept="video/mp4"
            onChange={(e) => setVideoFile(e.target.files[0])}
            required
          ></input>

          <button
            type="submit"
            className="p-2 bg-sky-500 w-full rounded-md mt-3 hover:bg-sky-700"
            disabled={isUploading}
          >
            {isUploading ? "Uploading...." : "Upload"}
          </button>
        </form>
      </div>
    </div>
  );
}
