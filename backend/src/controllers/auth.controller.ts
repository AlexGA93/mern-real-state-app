import { NextFunction, Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModelType } from "../types/types";
import { User } from "../database/models/User.model";
import { hashingPassword } from "../utils/hash";
import { errorHandler } from "../utils/error";
import { signJWT } from "../utils/jwt";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // body info
  const { username, email, password }: UserModelType = req.body;

  // mongoose model
  const newUser = new User({
    username,
    email,
    password: hashingPassword(password, 10),
  });
  try {
    //  save to mongo database
    await newUser.save();
    res.status(201).json({ msg: "User created successfully!" });
  } catch (err: any) {
    next(errorHandler(err.message));
  }
};

export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // body info
  const { email, password }: UserModelType = req.body;
  
  try {
    // check if email exists
    const validUser = await User.findOne({ email });
    

    if (!validUser) return next(errorHandler("User Not Found"));

    //  check password
    const validPassword = await bcryptjs.compareSync(
      password,
      validUser.password
    );
    if (!validPassword) return next(errorHandler("Wrong Credentials"));

    // create JWT
    const token: string = signJWT({ id: validUser.id });

    // avoid password to be returned
    const { password: pass, ...finalUser } = validUser._doc;

    // store in the cookies and return user logged in
    res
      .cookie("access_token", {
        token,
        // options
        httpOnly: true,
        // expires: new Date(Date.now()+24*60*60)
      })
      .status(200)
      .json(finalUser);
  } catch (err) {
    next(err);
  }
};

export const signInGoogleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    // check if email exists
    const validUser = await User.findOne({ email: req.body.email });
    
    if (validUser) {
      const token: string = signJWT({ id: validUser._id });
      // avoid password to be returned
      const { password: pass, ...finalUser } = validUser._doc;

      // store in the cookies and return user logged in
      res
        .cookie("access_token", {
          token,
          // options
          httpOnly: true,
          // expires: new Date(Date.now()+24*60*60)
        })
        .status(200)
        .json(finalUser);
    } else {
      // If user is not registered with google account
      // generate random password
      const generatedPassword: string =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
        // console.log(generatedPassword);
        
      // hash random password
      const hashedPassword: string = hashingPassword(generatedPassword, 10);
      // console.log(hashedPassword);
      

      // new User
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo
      });
      console.log(newUser);

      // save new user
      await newUser.save();

      // JWT
      const token: string = signJWT({ id: newUser._id });

      // avoid password to be returned
      const { password: pass, ...finalUser } = newUser._doc;

      // store in the cookies and return user logged in
      res
        .cookie("access_token", {
          token,
          // options
          httpOnly: true,
          // expires: new Date(Date.now()+24*60*60)
        })
        .status(200)
        .json(finalUser);
    }
  } catch (err) {
    next(err);
  }
};
