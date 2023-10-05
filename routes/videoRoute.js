import { Router } from "express";
import multer from "multer";
import {
  createVideo,
  deleteVideo,
  getAllVideos,
  getChannelVideo,
  getSingleVideo,
  updateViews,
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
router.get("/all", getAllVideos);
router.delete("/delete/:id", deleteVideo);
router.get("/find/:id", getSingleVideo);
router.patch("/updateviews/:id", updateViews);

export default router;
