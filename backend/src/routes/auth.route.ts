import express, { Router } from "express";
import {
  signInController,
  signInGoogleController,
  signOutController,
  signUpController,
} from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController);
router.post("/google", signInGoogleController);
router.get("/signout", signOutController);

export default router;
