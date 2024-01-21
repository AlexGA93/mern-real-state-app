import {Request, Response, NextFunction} from 'express';
import { errorHandler } from '../utils/error';
import { hashingPassword } from '../utils/hash';
import { User } from '../database/models/User.model';

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {

  try {
    if (req.body.password) req.body.password = hashingPassword(req.body.password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser!._doc;

    res.status(200).json(rest);
    
  } catch (error) {
    next(error);
  }
};