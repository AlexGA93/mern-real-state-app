
const AUTH_API_ROUTES = '/auth';
export const API_ROOT_ROUTE = '/api';
export const API_USER_ROUTES = '/user';

export const ROUTES = {
  ROOT:'/',
  SIGNIN: '/sign-in',
  SIGNUP: '/sign-up',
  SIGNOUT: '/sign-out',
  ABOUT: '/about',
  PROFILE: '/profile'
}; 

export const API_ROUTES = {
  AUTH: {
    SIGNIN: AUTH_API_ROUTES+'/signin',
    SIGNUP: AUTH_API_ROUTES+'/signup'
  },
  OAUTH: {
    GOOGLE: AUTH_API_ROUTES+'/google'
  }
}

export const USER_ROUTES = {
  UPDATE: API_ROOT_ROUTE+API_USER_ROUTES+'/update'
}