import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../features/auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOut());
  });

  return <div>Logout</div>;
};

export default Logout;
