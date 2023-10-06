import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import BigSideBar from "../components/BigSideBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { assignUser } from "../features/auth/authSlice";

import EditChannel from "../components/EditChannel";
import UploadVideo from "../components/UploadVideo";

export default function Home() {
  const { showBigBar, singleVideoPage } = useSelector(
    (state) => state.toggleSideBar
  );
  const { editChannel } = useSelector((state) => state.channel);
  const { uploadVideo } = useSelector((state) => state.yourVideos);
  const dispatch = useDispatch();

  async function fetchUser() {
    const { data } = await axios.get("/api/auth/user");

    dispatch(assignUser(data));
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {editChannel && <EditChannel />}
      {uploadVideo && <UploadVideo />}
      <Navbar />
      <div className="flex bg-neutral-950 text-white min-h-screen gap-3 m-0">
        {!singleVideoPage && (showBigBar ? <BigSideBar /> : <SideBar />)}

        <div className="relative">
          <Outlet />
        </div>
      </div>
    </>
  );
}
