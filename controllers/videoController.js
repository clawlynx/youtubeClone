import { Video } from "../models/Video.js";
import jwt from "jsonwebtoken";

export const createVideo = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      const newVideo = new Video({
        fileName: req.file.filename,
        videoName: req.body.videoName,
        videoDescription: req.body.videoDescription,
        uploader: req.body.uploader,
        accountHolder: userId,
        created: new Date(Date.now()).toISOString(),
      });
      await newVideo.save();
      res.status(200).json(newVideo);
    } else {
      console.log("something Wrong no user found");
    }
  } else {
    throw new Error();
  }
};

export const getChannelVideo = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      const videos = await Video.find({ accountHolder: userId }).populate(
        "uploader"
      );
      if (videos.length > 0) {
        res.status(200).json(videos);
      } else {
        console.log("no videos found");
      }
    } else {
      console.log("something Wrong no user found");
    }
  } else {
    res.json(null);
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const allvideos = await Video.find().populate("uploader");
    if (allvideos) {
      res.status(200).json(allvideos);
    } else {
      console.log("no videos found");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      try {
        const deleted = await Video.findByIdAndDelete(id);
        res.status(200).json({ msg: "deleted" });
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

export const getSingleVideo = async (req, res) => {
  const { id } = req.params;
  try {
    const onevideo = await Video.findById(id).populate("uploader");
    if (onevideo) {
      res.status(200).json(onevideo);
    } else {
      console.log("no videos found");
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const updateViews = async (req, res) => {
  const { id } = req.params;
  try {
    const currentvideo = await Video.findById(id);
    if (currentvideo) {
      const updatevideo = await Video.findByIdAndUpdate(
        id,
        { views: currentvideo.views + 1 },
        { new: true }
      ).populate("uploader");
      if (updatevideo) {
        res.status(200).json(updatevideo);
      } else {
        console.log("no videos found");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};
