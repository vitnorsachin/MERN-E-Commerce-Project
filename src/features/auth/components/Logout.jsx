import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync, signOutP } from "../authSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const Logout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
    // dispatch(signOutP());
  },[dispatch]);

  return (
    <>
      {!user && <Navigate to="/login" replace={true}></Navigate>}
    </>
  );
};
export default Logout;