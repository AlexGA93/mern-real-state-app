export interface UserType {
  username?: string,
  email: string,
  password: string
}

export interface UserStoreType {
  currentUser: null | UserType,
  error: null | Error,
  loading: boolean
}