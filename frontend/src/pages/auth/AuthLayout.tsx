import { useEffect } from "react";
import { loginBackground, logoBlack } from "../../assets";
import { Outlet } from "react-router-dom";
import Blur from "../../components/Blur";

const AuthLayout = () => {
  useEffect(() => {}, []);

  return (
    <>
      <div
        className="relative flex-col px-16 py-10 w-full h-screen"
        style={{
          background: `url(${loginBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Blur />
        <img className="absolute top-10 left-10" src={logoBlack} alt="Logo" />
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
