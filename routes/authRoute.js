import { Router } from "express";
import {
  clearHistory,
  createUser,
  getUser,
  getlwlwhVideos,
  googleSignIn,
  loginUser,
  removeWatchLater,
  signOutUser,
  updateHistory,
} from "../controllers/authController.js";

const router = Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/user", getUser);
router.get("/signout", signOutUser);
router.post("/googlelogin", googleSignIn);
router.get("/getlwlwhVideos", getlwlwhVideos);
router.patch("/removewatchlater", removeWatchLater);
router.patch("/updatehistory", updateHistory);
router.patch("/clearhistory", clearHistory);

export default router;
