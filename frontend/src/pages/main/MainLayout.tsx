import { Outlet, useNavigate } from "react-router-dom";
import Contacts from "../../components/Contacts";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import { getIsAuthenticated } from "../../features/auth/authSlice";
import { getActivities } from "../../features/explore/exploreSlice";
import MobileNavbar from "../../components/MobileNavbar";

const MainLayout = () => {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth/login");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(getActivities({ latitude: "51.50853", longitude: "-0.12574" }));
  }, []);

  return (
    <div className="flex dark:bg-darkMainBackground">
      <div className="xs:inline hidden lg:w-1/4 min-w-[78px] dark:bg-darkMainBackground">
        <Navbar currentPageId={"feed"} />
      </div>
      <div className="z-10 xs:hidden absolute dark:bg-darkMainBackground">
        <MobileNavbar currentPageId={"feed"} />
      </div>
      <div className=" min-w-[320px] lg:w-1/2 w-full min-h-[110vh] h-full shadow-inner bg-mainLightGray dark:bg-darkMainSection">
        <div className="flex flex-col gap-5 lg:mx-5 mx-3">
          <Outlet />
        </div>
      </div>
      <div className=" lg:block hidden dark:bg-darkMainBackground">
        <Contacts />
      </div>
    </div>
  );
};

export default MainLayout;
