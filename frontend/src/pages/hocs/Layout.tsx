import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const Layout = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
