import { useState } from "react";
import { loginBackground } from "../assets";
import { Outlet } from "react-router-dom";
const AuthContext = () => {
  return (
    <div
      className="flex-col px-16 py-10 w-[100%] h-screen"
      style={{
        background: `url(${loginBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <header className="flex flex-1">
        <h1 className="text-[24px] font-bold">Adventurer.Net</h1>
      </header>
      <Outlet />
    </div>
  );
};

export default AuthContext;
