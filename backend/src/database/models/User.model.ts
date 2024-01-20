import mongoose, { Schema } from "mongoose";
import { UserModelType } from "../../types/types";

const UserModel = {
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
};

const userSchema = new Schema<UserModelType>(UserModel, { timestamps: true });

export const User = mongoose.model('User', userSchema);