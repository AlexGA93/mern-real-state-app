import { NextFunction, Request, Response } from "express";
import { UserModelType } from "../types/types";
import { User } from "../database/models/User.model";
import { hashingPassword } from "../utils/hash";
import { errorHandler } from "../utils/error";

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
  // body info
  const { username, email, password }: UserModelType = req.body;
  
  // mongoose model
  const newUser = new User({username, email, password: hashingPassword(password, 10)});
  try {
    //  save to mongo database
    await newUser.save();
    res.status(201).json({msg:"User created successfully!"})
  } catch (err: any) {
    next(errorHandler(err.message));
  }
}