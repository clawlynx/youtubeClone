import React, { useEffect, useState } from "react";
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
  assignSingleVideo,
  markLiked,
  markDisliked,
  unmarkDisliked,
  unmarkLiked,
  markSaved,
  unmarkSaved,
} from "../features/videorender/videoRenderSlice";
import axios from "axios";
import { assignUser } from "../features/auth/authSlice";

export default function VideoPageButtons({ videoId }) {
  const { isLiked, isDisliked, isSaved, singleVideo } = useSelector(
    (state) => state.videoRender
  );
  const { user, likedVideos } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  //console.log(` likedVideos: ${likedVideos}`);
  //console.log(`dis: ${user?.dislikedVideos}`);

  //function for adding liked video to user
  async function updateLikedVideo(id, what) {
    const updata = {
      userId: user._id,
      videoId: id,
      isAdd: what,
    };
    const { data } = await axios.patch(
      "/api/buttonactions/updateLikedVideos",
      updata
    );
    if (data) {
      dispatch(assignUser(data));
    } else {
      console.log("no user");
    }
  }

  //function for updating Disliked videos
  async function updateDisLikedVideo(id, what) {
    const updata = {
      userId: user._id,
      videoId: id,
      isAdd: what,
    };
    const { data } = await axios.patch(
      "/api/buttonactions/updateDisLikedVideos",
      updata
    );
    if (data) {
      dispatch(assignUser(data));
    } else {
      console.log("no user");
    }
  }

  //function forhandling like
  async function handleLike() {
    const { data } = await axios.patch("/api/buttonactions/like", { videoId });
    if (data) {
      dispatch(assignSingleVideo(data));
      dispatch(markLiked());
      dispatch(unmarkDisliked());

      if (user?._id) {
        updateLikedVideo(videoId, "add");
        if (isDisliked) {
          updateDisLikedVideo(videoId, "remove");
        }
      }
    } else {
      console.log("like action failed");
    }
  }

  //function for unliking
  async function handleUnlike() {
    const { data } = await axios.patch("/api/buttonactions/unlike", {
      videoId,
    });
    if (data) {
      dispatch(assignSingleVideo(data));
      dispatch(unmarkLiked());

      if (user?._id) {
        updateLikedVideo(videoId, "remove");
      }
    } else {
      console.log("unlike action failed");
    }
  }

  //function for dislike
  async function dislike() {
    dispatch(markDisliked());
    if (isLiked) {
      dispatch(unmarkLiked());
      handleUnlike();
    }
    if (user?._id) {
      updateDisLikedVideo(videoId, "add");
    }
  }
  //function for undislike
  async function undisLike() {
    dispatch(unmarkDisliked());
    if (user?._id) {
      updateDisLikedVideo(videoId, "remove");
    }
  }

  //function to add to watch later
  async function addSaved() {
    dispatch(markSaved());
    if (user?._id) {
      const updata = {
        videoId,
        isAdd: "add",
        userId: user._id,
      };
      const { data } = await axios.patch(
        "/api/buttonactions/updateWatchLater",
        updata
      );
      if (data) {
        dispatch(assignUser(data));
      } else {
        console.log("failed to update");
      }
    }
  }

  //function for removing from watch later

  async function removeSaved() {
    dispatch(unmarkSaved());
    if (user?._id) {
      const updata = {
        videoId,
        isAdd: "remove",
        userId: user._id,
      };
      const { data } = await axios.patch(
        "/api/buttonactions/updateWatchLater",
        updata
      );
      if (data) {
        dispatch(assignUser(data));
      } else {
        console.log("failed to update");
      }
    }
  }

  // function for initial render
  function initialrender() {
    if (user?._id) {
      if (user?.likedVideos.includes(videoId)) {
        dispatch(markLiked());
      } else {
        dispatch(unmarkLiked());
      }
      if (user?.dislikedVideos.includes(videoId)) {
        dispatch(markDisliked());
      } else {
        dispatch(unmarkDisliked());
      }
      if (user?.watchLater.includes(videoId)) {
        dispatch(markSaved());
      } else {
        dispatch(unmarkSaved());
      }
      //console.log("success");
    }
  }
  useEffect(() => {
    initialrender();
  }, [singleVideo, user]);
  return (
    <div className=" flex gap-2 mb-1">
      {isLiked ? (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={handleUnlike}
        >
          <AiFillLike size={"1.75rem"} className=" fill-blue-500" />
          <p>Liked</p>
          <p className=" border-s ps-2">{singleVideo?.videoLikes}</p>
        </div>
      ) : (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={handleLike}
        >
          <AiOutlineLike size={"1.75rem"} />
          <p>Like</p>
          <p className=" border-s ps-2">{singleVideo?.videoLikes}</p>
        </div>
      )}
      {isDisliked ? (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={undisLike}
        >
          <AiFillDislike size={"1.75rem"} className=" fill-blue-500" />
          <p>Disliked</p>
        </div>
      ) : (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={dislike}
        >
          <AiOutlineDislike size={"1.75rem"} />
          <p>Dislike</p>
        </div>
      )}
      {isSaved ? (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={removeSaved}
        >
          <MdPlaylistAddCheck className=" text-blue-500" size={"1.75rem"} />
          <p>Saved</p>
        </div>
      ) : (
        <div
          className=" flex gap-2 items-center bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
          onClick={addSaved}
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
