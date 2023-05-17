import React, { useEffect, useState } from "react";
import { loginLock, loginEmail } from "../../assets";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const [confirmedPassword, setConfirmedPassword] = useState<
    string | undefined
  >();
  const [isShowing, setIsShowing] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmedPassword(event.target.value);
  };

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(email);
    console.log(password);
    if (password === confirmedPassword) {
      console.log("Password Match!");
    } else {
      console.log("Password Does't Match!");
    }
  };

  useEffect(() => {
    setIsShowing(true);
  });

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleOnSubmit}
        className={`flex flex-col justify-center transition-all ease-in-out duration-500 ${
          isShowing ? "opacity-100" : "opacity-0"
        } p-6 mt-24 backdrop-blur-lg bg-white/30 rounded-[5%] shadow-md`}
      >
        <label className="flex justify-center text-[32px] font-bold mt-2">
          Registration
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
            className="pb-1 border-b-[1px] border-black w-[350px] bg-transparent focus:outline-none"
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
            className="pb-1 border-b-[1px] border-black w-[350px] bg-transparent focus:outline-none"
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
            value={confirmedPassword}
            onChange={handleConfirmPasswordChange}
            type="password"
            placeholder="Confirm password"
            className="pb-1 border-b-[1px] border-black w-[350px] bg-transparent focus:outline-none"
          />
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="flex justify-center w-[343px] transition shadow-md shadow-orange-400/50 hover:shadow hover:shadow-orange-400/50 text-white bg-orange-400 hover:bg-orange-400/90 font-medium rounded-lg text-[16px] px-5 py-2.5"
          >
            Register
          </button>
        </div>
        <div className="font-[500] flex justify-center mt-4 text-[16px]">
          <span className="mr-1">Already have an account? </span>
          <Link to="/auth/login" className="font-[700] hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;