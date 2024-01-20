/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignUpType } from "../types/types";

const SignIn = () => {

  const navigate = useNavigate();

  const defaultFormState = {
    email: '',
    password: ''
  }

  // local component state
  const [formData, setFormData] = useState<SignUpType>(defaultFormState);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setFormData({
      // leep previous information
      ...formData,
      // update changes
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // loading state while submiting form data
    setLoading(true);

    const request: RequestInit = {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(formData)
    };
    const res = await fetch('/api/auth/signin', request);

    const data = await res.json();

    if(data.success === false){
      // deactve loading state
      setLoading(false);
      // update error state
      setError(data.message);

      return;
    }
    setError(null);
    setLoading(false);
    // navigate to Home Page if completed
    navigate('/');
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
        disabled={loading}
        className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
          { loading ? 'Loading...' : 'Sign In' }
        </button>
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
