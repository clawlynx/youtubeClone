import { Comment } from "../models/Comment.js";

export const getComment = async (req, res) => {
  const { id } = req.params;
  try {
    const currentComments = await Comment.find({ videoId: id }).populate(
      "whoCommented"
    );
    if (currentComments) {
      res.status(200).json(currentComments);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const createComment = async (req, res) => {
  const { userId, videoId, comment, location } = req.body;
  try {
    const newComment = new Comment({
      created: new Date(Date.now()).toISOString(),
      videoId: videoId,
      whoCommented: userId,
      body: comment,
      location: location,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    throw new Error();
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedcomment = await Comment.findByIdAndDelete(id);
    if (deletedcomment) {
      res.status(200).json(deletedcomment);
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const editComment = async (req, res) => {
  const { id, body, location } = req.body;
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { body: body, location: location },
      { new: true }
    );
    if (updatedComment) {
      res.status(200).json(updatedComment);
    }
  } catch (error) {
    throw new Error(error);
  }
};
