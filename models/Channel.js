import mongoose, { Schema, model } from "mongoose";

const channelSchema = new Schema(
  {
    channelName: { type: String, required: true },
    channelDescription: { type: String, required: true },
    totalVideos: { type: Number, default: 0 },
    subscribers: { type: Number, default: 0 },
    subscriberList: [String],
    totalLikes: { type: Number, default: 0 },

    owner: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

export const Channel = model("Channel", channelSchema);
