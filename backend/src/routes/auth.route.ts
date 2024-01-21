import express, { Router } from "express";
import { signInController, signInGoogleController, signUpController } from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/signup", signUpController);
router.post("/signin", signInController)
router.post("/google", signInGoogleController);
export default router;