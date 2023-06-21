import { useEffect } from "react";
import { loginBackground, logoBlack } from "../../assets";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  useEffect(() => {}, []);

  return (
    <div
      className="flex-col px-16 py-10 w-[100%] h-screen"
      style={{
        background: `url(${loginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img className="flex flex-1" src={logoBlack} />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
