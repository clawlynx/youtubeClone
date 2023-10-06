import { Router } from "express";
import {
  addLikes,
  substractLikes,
  updateDisLikedVideos,
  updateLikedVideos,
} from "../controllers/buttonsController.js";

const router = Router();

router.patch("/like", addLikes);
router.patch("/unlike", substractLikes);
router.patch("/updateLikedVideos", updateLikedVideos);
router.patch("/updateDisLikedVideos", updateDisLikedVideos);

export default router;
