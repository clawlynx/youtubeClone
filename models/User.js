import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    image: String,
    joinedOn: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
  }
);
export const User = model("User", userSchema);
