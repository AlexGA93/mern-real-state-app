export interface UserModelType extends Document {
  username?: string;
  email: string;
  password: string;
  avatar: string;
  _doc?: any
}