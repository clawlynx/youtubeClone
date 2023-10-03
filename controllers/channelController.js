import jwt from "jsonwebtoken";
import { Channel } from "../models/Channel.js";

export const createChannel = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      const { channelName, channelDescription } = req.body;
      try {
        const newChannel = new Channel({
          channelName,
          channelDescription,
          owner: userId,
        });
        await newChannel.save();
        res.status(201).json({ newChannel });
      } catch (error) {
        throw new Error(error);
      }
    } else {
      console.log("something Wrong no user found");
    }
  } else {
    throw new Error();
  }
};

export const getChannel = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      try {
        const currentChannel = await Channel.findOne({ owner: userId });
        if (currentChannel) {
          res.status(200).json(currentChannel);
        } else {
          console.log("no channel found");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  } else {
    console.log("no token");
  }
};

export const editChannel = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      const { channelName, channelDescription } = req.body;
      try {
        const currentChannel = await Channel.findOneAndUpdate(
          { owner: userId },
          { channelName, channelDescription }
        );
        if (currentChannel) {
          res.status(200).json(currentChannel);
        } else {
          console.log("no channel found");
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  } else {
    console.log("no token");
  }
};
