import express, { Router, Request, Response } from "express";
import { signUpController } from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/signup", signUpController);

export default router;