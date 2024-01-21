import {Request, Response, NextFunction} from 'express'
import { errorHandler } from './error';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from 'dotenv';
import { verifyJWT } from './jwt';
import { User } from '../database/models/User.model';
config();

export const authenticationByUser  = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.cookies.access_token.token;
  
  // if there is no token return errorby middleware
  if(!token) return next(errorHandler('Unauthorized!'));

  // check if we can verify our token
  const decoded: string | JwtPayload = verifyJWT(token);

  // we'll uethis verified token to fonde a user 
  const user = await User.findById({_id: (decoded as JwtPayload).id}).select("_id");

  // compare found id with provided id
  if(user!.id === (decoded as JwtPayload).id){
    console.log("User has been authenticated successfully");
    next();
  }else{
    next(errorHandler('Error during authentication proccess'));
  }
};