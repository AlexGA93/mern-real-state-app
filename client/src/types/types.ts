export interface UserType {
  username?: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface UserStoreType {
  currentUser: null | UserType,
  error: null | Error,
  loading: boolean
}