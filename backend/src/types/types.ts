export interface UserModelType extends Document {
  username?: string,
  email: string,
  password: string,
  _doc?: any
}