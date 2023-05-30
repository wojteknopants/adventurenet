import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  checkIsAuthenticated,
  getIsAuthenticated,
  loadUser,
} from "../../features/auth/authSlice";
import { AppDispatch } from "../../store";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkIsAuthenticated()).then(() => dispatch(loadUser()));
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
