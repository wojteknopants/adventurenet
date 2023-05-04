import React, { useEffect, useState } from "react";
import { loginLock, loginEmail } from "../../assets";
import { Link } from "react-router-dom";
import CheckBox from "../../components/CheckBox";

const LoginForm = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [isShowing, setIsShowing] = useState(false);

  const testResponsAPI = {
    response: "accept",
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
  };

  function timeout(delay: number) {
    setIsShowing(false);
    return new Promise((res) => setTimeout(res, delay));
  }

  useEffect(() => {
    setIsShowing(true);
  });

  return (
    <div className={`flex justify-center`}>
      <form
        onSubmit={handleOnSubmit}
        className={`flex flex-col justify-center transition-all ease-in-out duration-500 ${
          isShowing ? "opacity-100" : "opacity-0"
        } p-6 mt-24 backdrop-blur-lg bg-white/30 rounded-[5%]`}
      >
        <label className={`flex justify-center text-[32px] font-bold mt-2`}>
          Login
        </label>
        <div className="mt-8">
          {/* <label className="absolute font-semibold mt-[-8px]">Email</label> */}
          <img
            src={loginEmail}
            alt="email"
            className="absolute right-0 mr-8 mt-2"
          />
          <input
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            type="email"
            className="pb-1 required:border-red-500 border-b-[1px] border-black w-[350px] bg-transparent focus:outline-none"
          />
        </div>
        <div className="mt-8">
          {/* <label className="absolute font-semibold">Password</label> */}
          <img
            src={loginLock}
            alt="lock"
            className="absolute right-0 mr-8 mt-2"
          />
          <input
            value={password}
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            className="pb-1 required:border-red-500 border-b-[1px] border-black w-[350px] bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex flex-row mt-8">
          <CheckBox />
          <span className="ml-1 mb-[1px] font-medium text-[12px]">
            Remember me
          </span>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="flex justify-center w-[343px] text-white bg-orange-400 transition hover:bg-orange-400/90 font-medium rounded-lg text-[16px] px-5 py-2.5"
          >
            Login
          </button>
        </div>
        <div className="font-[500] flex justify-center mt-4 text-[16px]">
          <span className="mr-1">Don't have an account? </span>
          <Link to="/registration" className="font-[700]">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
