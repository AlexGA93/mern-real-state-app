import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { UserStoreType } from "../types/types";
import { ROUTES } from "../utils/constants";

const Header = () => {
  // access to redux state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { currentUser }: UserStoreType = useSelector(
    (state: RootState) => state.user
  );

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* logo */}
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl fex flex-wrap">
            <span className="text-slate-500">Alex</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        {/* search */}
        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64 "
          />
          <FaSearch className="text-sate-600" />
        </form>
        {/* menu */}
        <ul className="flex gap-4">
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to={ROUTES.ROOT}>Home</Link>
          </li>
          <li className="hidden sm:inline text-slate-700 hover:underline">
            <Link to={ROUTES.ABOUT}>About</Link>
          </li>
          {/* only visible at the mobile size */}
          <li className=" text-slate-700 hover:underline">
            <Link to={ROUTES.PROFILE}>
              {/* condition if user is Logged we show image profile, but if not we show link */}
              {currentUser ? (
                <img className="rounded-full h-7 w-7 object-cover" src={currentUser.avatar} alt="user_avatar" />
              ) : (
                "Sign In"
              )}
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};
export default Header;
