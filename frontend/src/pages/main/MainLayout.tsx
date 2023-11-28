import { Outlet, useNavigate } from "react-router-dom";
import Contacts from "../../components/Contacts";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import {
  checkIsAuthenticated,
  getIsAuthenticated,
} from "../../features/auth/authSlice";

const MainLayout = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();
  // const dispatch: AppDispatch = useDispatch();

  // dispatch(checkIsAuthenticated()).then(() => {
  //   console.log(isAuthenticated);
  //   if (!isAuthenticated) {
  //     navigate("/auth/login");
  //   }
  // });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex justify-between">
      <div className="xs:block hidden w-1/4">
        <Navbar currentPageId={"feed"} />
      </div>
      <div className=" min-w-[320px] xs:w-1/2 min-h-screen h-full shadow-inner bg-slate-100">
        <div className="mx-8">
          <Outlet />
        </div>
      </div>
      <div className="w-1/4 xs:block hidden">
        <Contacts />
      </div>
    </div>
  );
};

export default MainLayout;
