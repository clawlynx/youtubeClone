import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoute.js";
import channelRouter from "./routes/channelRoute.js";
import videoRouter from "./routes/videoRoute.js";
import buttonsRouter from "./routes/buttonsRoute.js";

const app = express();

app.use(cookieParser());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join("uploads")));
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/auth", authRouter);
app.use("/api/channel", channelRouter);
app.use("/api/video", videoRouter);
app.use("/api/buttonactions", buttonsRouter);

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: "something went wrong" });
});

try {
  await mongoose.connect(process.env.MONGODB_URI);
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`server running`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
