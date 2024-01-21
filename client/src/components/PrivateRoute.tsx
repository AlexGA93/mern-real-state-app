import { useSelector } from "react-redux";
import { UserStoreType } from "../types/types";
import { RootState } from "../redux/store";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {

  // extract user information from state
  const { currentUser }: UserStoreType = useSelector(
    (state: RootState) => state.user
  );

  // redirect by condition to the outer element or the inner one
  return currentUser ? (<Outlet />) : (<Navigate to='sign-in' />);
}
export default PrivateRoute