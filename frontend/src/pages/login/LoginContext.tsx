import React, { useState } from "react";
import { loginBackground, loginEmail, loginLock } from "../../assets";
import LoginForm from "./LoginForm";
const LoginContext = () => {
  return (
    <div
      className="flex-col px-16 py-10 w-[100%] h-screen"
      style={{
        background: `url(${loginBackground})`,
        backgroundSize: "200% 200%",
        backgroundPosition: "50% 80%",
      }}
    >
      <header className="flex flex-1">
        <h1 className="text-[24px] font-bold">Adventurer.Net</h1>
      </header>
      <LoginForm />
    </div>
  );
};

export default LoginContext;
