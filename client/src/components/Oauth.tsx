/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../redux/user/userSlice";

const Oauth = () => {

  const dispatch = useDispatch();

  const handleGoogleClick = async () => {
    try {
      // provide our google provider

      const result = await signInWithPopup(
        getAuth(app),
        new GoogleAuthProvider()
      );
      //  send to backend
      const request: RequestInit = {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      };
      const res = await fetch('/api/auth/google', request );
      const data = await res.json();

      dispatch(signInSuccess(data));

    } catch (error) {
      console.error(error);
      dispatch(signInFailure(error));
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue with Google
    </button>
  );
};
export default Oauth;
