import { Router } from "express";
import {
  createUser,
  getUser,
  googleSignIn,
  loginUser,
  signOutUser,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/user", getUser);
router.get("/signout", signOutUser);
router.post("/googlelogin", googleSignIn);

export default router;
