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
        res.status(201).json(newChannel);
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
          res.json(null);
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
          { channelName, channelDescription },
          { new: true }
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

export const updateTotalVideos = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      const { totalVideos, _id } = req.body;
      try {
        const currentChannel = await Channel.findByIdAndUpdate(
          _id,
          { totalVideos: totalVideos + 1 },
          { new: true }
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

export const reduceTotalVideos = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      const { totalVideos, _id } = req.body;
      try {
        const currentChannel = await Channel.findByIdAndUpdate(
          _id,
          { totalVideos: totalVideos - 1 },
          { new: true }
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
