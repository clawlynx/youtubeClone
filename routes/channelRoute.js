import { Router } from "express";
import {
  createChannel,
  editChannel,
  getChannel,
  reduceTotalVideos,
  subscribe,
  unsubscribe,
  updateTotalVideos,
} from "../controllers/channelController.js";

const router = Router();

router.post("/create", createChannel);
router.get("/data", getChannel);
router.patch("/edit", editChannel);
router.patch("/updatetotalvideos", updateTotalVideos);
router.patch("/reducetotalvideos", reduceTotalVideos);
router.patch("/subscribe", subscribe);
router.patch("/unsubscribe", unsubscribe);

export default router;
