import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singlevideoPageOn } from "../features/togglesidebar/togglesidebarSlice";
import VideoPageButtons from "../components/VideoPageButtons";
import Comments from "../components/Comments";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  assignAllVideos,
  assignSingleVideo,
} from "../features/videorender/videoRenderSlice";
import timeElapsed from "../../utilities/datefunction";
import SmallVideo from "../components/smallVideo";
import { assignWhVideos } from "../features/auth/authSlice";
import { toast } from "react-toastify";

export default function SingleVideoPage() {
  const dispatch = useDispatch();
  const { singleVideo, videos } = useSelector((state) => state.videoRender);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  //function for getting the singlevideo details
  async function getSingleVideo() {
    const { data } = await axios.get(`/api/video/find/${id}`);
    if (data) {
      dispatch(assignSingleVideo(data));
      // console.log(data);
    } else {
      console.log("no data");
    }
  }

  //function for updating the views
  async function updateViews() {
    const { data } = await axios.patch(`/api/video/updateviews/${id}`);
    if (data) {
      dispatch(assignSingleVideo(data));
      // console.log(data);
    } else {
      console.log("no data");
    }
  }

  //function for updating history
  async function updateHistory() {
    if (user) {
      const { data } = await axios.patch("/api/auth/updatehistory", {
        videoId: id,
        isAdd: "add",
        userId: user._id,
      });
      if (data) {
        dispatch(assignWhVideos(data.history));
      } else {
        console.log("no data");
      }
    }
  }

  //function for subscription
  async function subscribe() {
    if (!user) {
      toast.warning("please login to subscribe");
    } else {
      const { data } = await axios.patch("/api/channel/subscribe", {
        email: user?.email,
        channelId: singleVideo?.uploader?._id,
      });
      if (data) {
        getSingleVideo();
      } else {
        toast.error("failed to subscribe. please try again later");
      }
    }
  }
  //function for unsubscription
  async function unsubscribe() {
    if (!user) {
      toast.warning("please login to unsubscribe");
    } else {
      const { data } = await axios.patch("/api/channel/unsubscribe", {
        email: user?.email,
        channelId: singleVideo?.uploader?._id,
      });
      if (data) {
        getSingleVideo();
      } else {
        toast.error("failed to unsubscribe. please try again later");
      }
    }
  }

  //function for fetching more videos
  async function fetchAllVideos() {
    const { data } = await axios.get("/api/video/all");
    if (data) {
      dispatch(assignAllVideos(data));
      console.log(data);
    } else {
      console.log("no videos");
      dispatch(assignAllVideos([]));
    }
  }

  useEffect(() => {
    dispatch(singlevideoPageOn());
    getSingleVideo();
    updateViews();
    updateHistory();
    fetchAllVideos();
  }, [id]);

  return (
    <div className="ps-28 py-5 flex gap-5 justify-between min-h-screen">
      <div className="">
        <div className="">
          <video
            className="videodiv"
            src={`http://localhost:3000/uploads/${singleVideo?.fileName}`}
            controls
            autoPlay
          ></video>
        </div>
        <div className=" py-3 px-2">
          <p className=" text-2xl">{singleVideo?.videoName}</p>
          <div className="flex items-center justify-between border-b border-neutral-800">
            <div className=" flex py-3 gap-2">
              <p className=" text-gray-400">{singleVideo?.views} views</p>
              <p className=" text-gray-400">.</p>
              <p className=" text-gray-400">
                {timeElapsed(singleVideo?.created)} ago
              </p>
            </div>
            <VideoPageButtons videoId={id} />
          </div>

          <div className="flex py-2 items-center gap-4 border-b border-neutral-800">
            <p className=" p-4 py-2 text-lg bg-green-900 rounded-full">
              {singleVideo?.uploader?.channelName.charAt(0).toUpperCase()}
            </p>
            <p className=" text-xl font-bold">
              {singleVideo?.uploader?.channelName}
            </p>
            {singleVideo?.uploader?.subscriberList.includes(user?.email) ? (
              <div
                className="ms-4 bg-blue-500 hover:bg-blue-700 py-1 px-2 rounded-lg cursor-pointer"
                onClick={unsubscribe}
              >
                <p className=" text-xl">Subscribed</p>
              </div>
            ) : (
              <div
                className="ms-4 bg-neutral-700 hover:bg-neutral-800 py-1 px-2 rounded-lg cursor-pointer"
                onClick={subscribe}
              >
                <p className=" text-xl">Subscribe</p>
              </div>
            )}
          </div>
          <div className="my-3 py-2 bg-neutral-600 rounded-lg border-b border-neutral-800">
            <p className="px-2 text-gray-300">
              {singleVideo?.videoDescription}
            </p>
          </div>
        </div>
        <div className=" py-3 px-2">
          <h1 className=" text-2xl">Comments</h1>
          <Comments />
        </div>
      </div>
      <div className="more-video-container">
        <h2 className=" text-lg">More videos</h2>

        {videos?.length > 0 &&
          videos?.map((video) => {
            return (
              <div
                key={video._id}
                className=" flex gap-2 py-4 border-b border-neutral-800"
              >
                <div className="more-videos ">
                  <Link to={`/videopage/${video._id}`}>
                    <SmallVideo
                      vid={`http://localhost:3000/uploads/${video.fileName}`}
                    />
                  </Link>
                </div>
                <div>
                  <Link to={`/videopage/${video._id}`} className="mb-2">
                    {video.videoName.slice(0, 24)}.....
                  </Link>
                  <p className="text-gray-500 text-sm">
                    {video.uploader.channelName}
                  </p>
                  <div className=" text-gray-500 text-sm flex gap-2">
                    <p>{timeElapsed(video.created)} ago</p>
                    <p>.</p>
                    <p>{video.views} views</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
