import express, { Router, Request, Response } from "express";
import { testApiController } from "../controllers/test.controller";

const router: Router = express.Router();

router.get("/", testApiController);


export default router;