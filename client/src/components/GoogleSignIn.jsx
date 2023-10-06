import { GoogleLogin } from "@react-oauth/google";
import React from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  channelok,
  setChannelDetails,
  sethasChannelFalse,
} from "../features/channel/channelSlice";
import { toast } from "react-toastify";

export default function GoogleSignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function fetchChannel() {
    const { data } = await axios.get("api/channel/data");
    if (data) {
      dispatch(channelok());
      dispatch(setChannelDetails(data));
    } else {
      console.log("no data");
      dispatch(setChannelDetails(null));
      dispatch(sethasChannelFalse());
    }
  }

  async function onSuccess(response) {
    var decoded = jwt_decode(response.credential);
    const userData = {
      username: decoded.name,
      email: decoded.email,
      image: decoded.picture,
    };
    const { data } = await axios.post("/api/auth/googlelogin", userData);
    if (data) {
      console.log("login successful");
      navigate("/");
      fetchChannel();
      toast.success("successfully logged in");
    } else {
      console.log("something wrong");
    }
  }
  return (
    <div className=" w-96 py-3 flex justify-center">
      <GoogleLogin
        onSuccess={onSuccess}
        onError={() => console.log("login failed")}
      />
    </div>
  );
}
