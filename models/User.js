import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    image: String,
    joinedOn: { type: Date, default: Date.now() },
    likedVideos: { type: [mongoose.Types.ObjectId], ref: "Video", default: [] },
    dislikedVideos: {
      type: [mongoose.Types.ObjectId],
      ref: "Video",
      default: [],
    },
    watchLater: { type: [mongoose.Types.ObjectId], ref: "Video", default: [] },
    history: { type: [mongoose.Types.ObjectId], ref: "Video", default: [] },
    searchHistory: [String],
    tryouts: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
export const User = model("User", userSchema);
