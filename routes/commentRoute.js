import { Router } from "express";
import {
  createComment,
  deleteComment,
  getComment,
} from "../controllers/commentController.js";

const router = Router();

router.get("/find/:id", getComment);
router.post("/add", createComment);
router.delete("/delete/:id", deleteComment);

export default router;
