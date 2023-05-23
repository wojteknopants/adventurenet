import { Outlet, useNavigate } from "react-router-dom";
import Contacts from "../../components/Contacts";
import Navbar from "../../components/Navbar";
import { useEffect } from "react";

const MainLayout = () => {
  const navigate = useNavigate();

  // redirecting ONLY FOR TESTING, delete it
  useEffect(() => {
    //navigate("/auth/login");
  });

  return (
    <div>
      <div className="flex justify-between">
        <div className="w-[362px]">
          <Navbar currentPageId={"feed"} />
        </div>
        <div className="w-[762px] h-[2000px] shadow-inner bg-slate-100">
          <div className="mx-8">
            <Outlet />
          </div>
        </div>
        <div className="w-[362px]">
          <Contacts />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
