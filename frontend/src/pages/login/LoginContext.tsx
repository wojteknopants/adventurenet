import React from "react";
import { loginBackground } from "../../assets";
import Button from "../../components/Button";

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
        <div className="text-[24px] font-bold">Adventurer.Net</div>
      </header>

      <div className="flex justify-center">
        <form className="flex flex-col justify-center p-6 mt-24 backdrop-blur-lg bg-white/30 rounded-[5%]">
          <label className="flex justify-center text-[32px] font-bold mt-2">
            Login
          </label>
          <label className="mt-8 font-semibold">Email</label>
          <input
            type="text"
            className="border-b-[1px] border-black w-[350px] bg-transparent"
          />
          <label className="mt-8 font-semibold">Password</label>
          <input
            type="text"
            className="border-b-[1px] border-black w-[350px] bg-transparent"
          />
          <input type="checkbox" className="mt-8"></input>
          <div className="flex justify-center mt-8">
            <Button />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContext;
