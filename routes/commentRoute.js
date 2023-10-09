import { Router } from "express";
import {
  createComment,
  deleteComment,
  editComment,
  getComment,
} from "../controllers/commentController.js";

const router = Router();

router.get("/find/:id", getComment);
router.post("/add", createComment);
router.delete("/delete/:id", deleteComment);
router.patch("/edit", editComment);

export default router;
