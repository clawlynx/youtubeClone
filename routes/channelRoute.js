import { Router } from "express";
import {
  createChannel,
  editChannel,
  getChannel,
} from "../controllers/channelController.js";

const router = Router();

router.post("/create", createChannel);
router.get("/data", getChannel);
router.patch("/edit", editChannel);

export default router;
