import { Request, Response } from "express";

export const testApiController = (req: Request, res: Response) => {
  res.json({ msg: "Hello!" })
}