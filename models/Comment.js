import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    videoId: { type: mongoose.Types.ObjectId, ref: "Video" },
    body: { type: String, required: true },
    whoCommented: { type: mongoose.Types.ObjectId, ref: "User" },
    location: { type: String },
    created: { type: Date },
  },
  {
    timestamps: true,
  }
);

export const Comment = model("Comment", commentSchema);
