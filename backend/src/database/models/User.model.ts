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
  // in case of google oauth
  avatar: {
    type: String,
    default: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngarts.com%2Ffiles%2F10%2FDefault-Profile-Picture-Transparent-Image.png&f=1&nofb=1&ipt=48b30e59b308651339e719fd03dd7a504d14b627de1cb6c329c29770755094c1&ipo=images"
  }
};

const userSchema = new Schema<UserModelType>(UserModel, { timestamps: true });

export const User = mongoose.model('User', userSchema);