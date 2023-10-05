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
      const videos = await Video.find({ accountHolder: userId });
      if (videos.length > 0) {
        res.status(200).json(videos);
      } else {
        console.log("no videos found");
      }
    } else {
      console.log("something Wrong no user found");
    }
  } else {
    throw new Error();
  }
};
