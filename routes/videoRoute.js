import { Router } from "express";
import multer from "multer";
import {
  createVideo,
  getChannelVideo,
} from "../controllers/videoController.js";

const router = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = "video" + Date.now();
    cb(null, uniqueSuffix + "." + file.originalname.split(".").pop());
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "video/mp4") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post("/create", upload.single("file"), createVideo);
router.get("/find", getChannelVideo);

export default router;
