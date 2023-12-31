import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { checkIsAuthenticated, loadUser } from "../../features/auth/authSlice";
import { AppDispatch } from "../../store";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkIsAuthenticated()).then(() => dispatch(loadUser()));
  });

  return (
    <div className="font-inter scroll scroll-smooth">
      {/* <DraftComponent /> */}
      <Outlet />
    </div>
  );
};

export default Layout;
