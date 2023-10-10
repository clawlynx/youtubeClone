import mongoose, { Schema, model } from "mongoose";

const videoSchema = new Schema({
  fileName: { type: String, required: true },
  videoName: { type: String, required: true },
  videoDescription: { type: String, required: true },
  videoLikes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  created: { type: Date },
  subscribersOnly: { type: Boolean },
  uploader: { type: mongoose.Types.ObjectId, ref: "Channel" },
  accountHolder: { type: mongoose.Types.ObjectId, ref: "User" },
});

export const Video = model("Video", videoSchema);
