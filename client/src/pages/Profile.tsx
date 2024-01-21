import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserStoreType } from "../types/types";

const Profile = () => {
  // access to redux state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser }: UserStoreType = useSelector(
    (state: RootState) => state.user
  );

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My Profile</h1>
      <form className="flex flex-col gap-4">
        {/* image */}
        <img
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
          src={currentUser?.avatar}
          alt="profile_image"
        />
        {/* username */}
        <input
          type="text"
          className="border p-3 rounded-lg"
          id="username"
          placeholder="Username"
        />
        {/* email */}
        <input
          type="email"
          className="border p-3 rounded-lg"
          id="email"
          placeholder="Email"
        />
        {/* password */}
        <input
          type="password"
          className="border p-3 rounded-lg"
          id="password"
          placeholder="Password"
        />
        {/* buttons */}
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      {/*  external buttons */}
      <div className="flex flex-wrap justify-center mt-2 sm:justify-between">
        {/* delete account */}
        <button className="w-full sm:w-48 mt-2 bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 ">
          Delete Account
        </button>
        {/* sign out */}
        <button className="w-full sm:w-48 mt-2 bg-gray-900 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 ">
          Sign Out
        </button>
      </div>
    </div>
  );
};
export default Profile;
