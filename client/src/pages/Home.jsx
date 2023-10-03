import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import BigSideBar from "../components/BigSideBar";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { assignUser } from "../features/auth/authSlice";
import { channelok, setChannelDetails } from "../features/channel/channelSlice";
import EditChannel from "../components/EditChannel";

export default function Home() {
  const { showBigBar, singleVideoPage } = useSelector(
    (state) => state.toggleSideBar
  );
  const { editChannel } = useSelector((state) => state.channel);
  const dispatch = useDispatch();

  async function fetchUser() {
    const { data } = await axios.get("/api/auth/user");

    dispatch(assignUser(data));
  }

  async function fetchChannel() {
    const { data } = await axios.get("api/channel/data");
    if (data) {
      dispatch(channelok());
      dispatch(setChannelDetails(data));
    } else {
      console.log("no data");
    }
  }

  useEffect(() => {
    fetchUser();
    fetchChannel();
  }, []);
  return (
    <>
      {editChannel && <EditChannel />}
      <Navbar />
      <div className="flex bg-neutral-950 text-white h-full gap-3 m-0">
        {!singleVideoPage && (showBigBar ? <BigSideBar /> : <SideBar />)}

        <div className="relative">
          <Outlet />
        </div>
      </div>
    </>
  );
}
