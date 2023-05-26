import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  checkIsAuthenticated,
  getIsAuthenticated,
} from "../../features/auth/authSlice";
import { AppDispatch } from "../../store";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkIsAuthenticated());
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
