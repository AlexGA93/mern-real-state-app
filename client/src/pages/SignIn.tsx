/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { UserStoreType, UserType } from "../types/types";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { AppDispatch, RootState} from "../redux/store";
import { Oauth } from "../components";
import { API_ROOT_ROUTE, API_ROUTES } from "../utils/constants";


const SignIn = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const userState: UserStoreType = useSelector((state: RootState) => state.user);

  const defaultFormState = {
    email: '',
    password: ''
  }

  // local component state
  const [formData, setFormData] = useState<UserType>(defaultFormState);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setFormData({
      // keep previous information
      ...formData,
      // update changes
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // loading state while submiting form data
      dispatch(signInStart());

      const request: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(formData)
      };
      
      const res = await fetch(API_ROOT_ROUTE+API_ROUTES.AUTH.SIGNIN, request);

      const data = await res.json();

      if(data.success === false){
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      // navigate to Home Page if completed
      navigate('/');

    } catch (error: unknown) {
      if (error instanceof Error) {
        dispatch(signInFailure(error.message))
      }      
    }
    
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      {/* title */}
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      {/* form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          id="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button 
        disabled={userState.loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          { userState.loading ? 'Loading...' : 'Sign In' }
        </button>
        {/* Google OAuth Button */}
        <Oauth />
      </form>
      {/* buttons */}
      <div className="flex gap-2 mt-5">
        <p>Don't have an account already?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  );
};
export default SignIn;
