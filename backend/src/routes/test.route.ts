import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

router.get("/test", (req: Request, res: Response) =>
  res.json({ msg: "Hello!" })
);


export default router;