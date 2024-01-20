import { Request, Response } from "express";
import { UserModelType } from "../types/types";
import { User } from "../database/models/User.model";
import { hashingPassword } from "../utils/hash";

export const signUpController = async (req: Request, res: Response) => {
  // body info
  const { username, email, password }: UserModelType = req.body;
  
  // mongoose model
  const newUser = new User({username, email, password: hashingPassword(password, 10)});
  
  //  save to mongo database
  await newUser
  .save()
  .then(() => res.status(201).json({msg:"User created successfully!"}))
  .catch((err: Error) => console.error(err));
  
}