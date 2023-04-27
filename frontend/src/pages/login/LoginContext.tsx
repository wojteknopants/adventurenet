import React from "react";
import { loginBackground } from "../../assets";
import Button from "../../components/Button";

const LoginContext = () => {
  return (
    <div
      className="flex-col px-10 py-5 w-[100%] h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <header className="flex flex-1">
        <div className="text-xl font-bold">Adventurer.Net</div>
      </header>

      <div className="flex justify-center ">
        <form className="flex flex-col justify-center p-6 mt-52 backdrop-blur-lg bg-white/30 rounded-[5%]">
          <label className="flex justify-center">Login</label>
          <label>Username</label>
          <input type="text" />
          <label>Password</label>
          <input type="text" />
          <input type="checkbox"></input>
          <div className="flex justify-center">
            <Button />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginContext;
