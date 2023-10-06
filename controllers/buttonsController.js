import { User } from "../models/User.js";
import { Video } from "../models/Video.js";
//for incrementing likes
export const addLikes = async (req, res) => {
  const { videoId } = req.body;
  if (videoId) {
    try {
      const currentvideo = await Video.findById(videoId);
      if (currentvideo) {
        const updated = await Video.findByIdAndUpdate(
          videoId,
          { videoLikes: currentvideo.videoLikes + 1 },
          { new: true }
        ).populate("uploader");
        res.status(200).json(updated);
      } else {
        console.log("no current video");
      }
    } catch (error) {
      throw new Error(error);
    }
  } else {
    console.log("invalid video id");
  }
};

//for decrementing likes
export const substractLikes = async (req, res) => {
  const { videoId } = req.body;
  if (videoId) {
    try {
      const currentvideo = await Video.findById(videoId);
      if (currentvideo) {
        const updated = await Video.findByIdAndUpdate(
          videoId,
          { videoLikes: currentvideo.videoLikes - 1 },
          { new: true }
        ).populate("uploader");
        res.status(200).json(updated);
      } else {
        console.log("no current video");
      }
    } catch (error) {
      throw new Error(error);
    }
  } else {
    console.log("invalid video id");
  }
};

//for updating likedvideoarray of user
export const updateLikedVideos = async (req, res) => {
  const { userId, isAdd, videoId } = req.body;
  if (userId) {
    if (isAdd === "add") {
      try {
        const currentUser = await User.findById(userId);
        const newLiked = currentUser.likedVideos;

        newLiked.push(videoId);

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { likedVideos: newLiked },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        throw new Error(error);
      }
    } else if (isAdd === "remove") {
      const currentUser = await User.findById(userId);
      const newLikedArr = currentUser.likedVideos;
      const newLiked = newLikedArr.filter(
        (item) => item.toString() !== videoId
      );
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { likedVideos: newLiked },
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } else {
    console.log("No user Id");
  }
};

//for updating dislikedvideoarray of user
export const updateDisLikedVideos = async (req, res) => {
  const { userId, isAdd, videoId } = req.body;
  if (userId) {
    if (isAdd === "add") {
      try {
        const currentUser = await User.findById(userId);
        const newLiked = currentUser.dislikedVideos;

        newLiked.push(videoId);

        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { dislikedVideos: newLiked },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (error) {
        throw new Error(error);
      }
    } else if (isAdd === "remove") {
      const currentUser = await User.findById(userId);
      const newLikedArr = currentUser.dislikedVideos;
      const newLiked = newLikedArr.filter(
        (item) => item.toString() !== videoId
      );
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { dislikedVideos: newLiked },
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } else {
    console.log("No user Id");
  }
};
