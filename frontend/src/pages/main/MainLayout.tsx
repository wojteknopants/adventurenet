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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex">
      <div className="xs:inline hidden lg:w-1/4 min-w-[78px]">
        <Navbar currentPageId={"feed"} />
      </div>
      <div className=" min-w-[320px] lg:w-1/2 w-full min-h-[200vh] h-full shadow-inner bg-mainLightGray">
        <div className="flex flex-col gap-5 lg:mx-5 mx-3">
          <Outlet />
        </div>
      </div>
      <div className=" lg:block hidden">
        <Contacts />
      </div>
    </div>
  );
};

export default MainLayout;
