import React, { useState } from "react";

import { Link, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";

import GoogleSignIn from "../components/GoogleSignIn";
import { useDispatch } from "react-redux";
import {
  channelok,
  setChannelDetails,
  sethasChannelFalse,
} from "../features/channel/channelSlice";
import { toast } from "react-toastify";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
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

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    const { data } = await axios.post("/api/auth/login", userData);
    if (data) {
      if (data.msg === "loginSuccessfull") {
        console.log("login successful");
        navigate("/");
        fetchChannel();
        toast.success("login successful");
      } else {
        toast.error(`${data.msg}`);
      }
    } else {
      console.log("login failed");
    }
  }

  return (
    <div className=" bg-neutral-950 w-screen h-screen flex justify-center items-center">
      <div className=" text-white py-5 px-4 text-center border border-neutral-900">
        <h1 className=" text-3xl ">Sign In/Sign Up</h1>
        <GoogleSignIn />
        <p className=" border-y border-neutral-900 py-2">OR</p>
        <p className=" text-lg">Sign In with Credentials</p>
        <form onSubmit={handleSubmit} className="py-5">
          <div className=" flex flex-col gap-2 py-2 mb-3">
            <label className="text-lg text-left">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abc@gmail.com"
              className=" px-2 py-1 grow bg-neutral-900 rounded-sm"
              required
            ></input>
          </div>
          <div className=" flex flex-col gap-2 py-2 mb-3">
            <label className="text-lg text-left">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className=" px-2 py-1 grow bg-neutral-900 rounded-sm"
              required
            ></input>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className=" bg-blue-500 p-2 w-full text-lg rounded-md hover:bg-blue-700"
          >
            {isSubmitting ? "Signing In" : "Sign In"}
          </button>
        </form>
        <p>
          Not a member?{" "}
          <Link to={"/signup"} className=" text-blue-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
