import { Router } from "express";
import {
  addLikes,
  substractLikes,
  updateDisLikedVideos,
  updateLikedVideos,
  updateWatchLater,
} from "../controllers/buttonsController.js";

const router = Router();

router.patch("/like", addLikes);
router.patch("/unlike", substractLikes);
router.patch("/updateLikedVideos", updateLikedVideos);
router.patch("/updateDisLikedVideos", updateDisLikedVideos);
router.patch("/updateWatchLater", updateWatchLater);

export default router;
