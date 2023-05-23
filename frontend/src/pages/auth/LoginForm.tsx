import React, { useEffect, useState } from "react";
import { loginLock, loginEmail } from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import {
  getIsAuthenticated,
  getStatus,
  checkAuthStatus,
  login,
} from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useSelect } from "@mui/base";
import { AppDispatch } from "../../store";

const LoginForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [isShowing, setIsShowing] = useState<boolean>(false);

  //const [errorMessages, setErrorMessages] = useState({});
  const isAuthenticated = useSelector(getIsAuthenticated);
  const status = useSelector(getStatus);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    //Prevent page reload
    event.preventDefault();

    // Exists credentials for testing
    setEmail("qba.lesniak@gmail.com");
    setPassword("janpawel2");
    //

    console.log(email);
    console.log(password);
    if (isChecked) {
      console.log("Remember my password!");
    } else {
      console.log("Don't remember my password!");
    }

    iDontKnowHowCanICallThisFunction();
  };

  const iDontKnowHowCanICallThisFunction = async () => {
    if (email !== undefined && password !== undefined) {
      await dispatch(login({ email, password }));

      await dispatch(checkAuthStatus());
    }
  };

  useEffect(() => {
    setIsShowing(true);
    if (isAuthenticated) {
      navigate("/feed");
    } else {
      console.log(status);
    }
  });

  return (
    <div className={`flex justify-center`}>
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col justify-center transition-all ease-in-out duration-500 shadow-md ${
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
            className="pb-1 border-b-[1px] border-black w-[350px] bg-transparent focus:outline-none"
            required
          />
          {/* {renderErrorMessage("userEmail")} */}
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
            required
          />
          {/* {renderErrorMessage("userPassword")} */}
        </div>
        <div className="flex flex-row mt-8">
          <input
            checked={isChecked}
            onChange={handleCheckboxChange}
            type="checkbox"
            value=""
            className=" accent-orange-400"
          />
          <span className="ml-1 mb-[1px] font-medium text-[12px]">
            Remember me
          </span>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="flex justify-center w-[343px] transition shadow-md shadow-orange-400/50 hover:shadow hover:shadow-orange-400/50 text-white bg-orange-400 hover:bg-orange-400/90 font-medium rounded-lg text-[16px] px-5 py-2.5"
          >
            Login
          </button>
        </div>
        <div className="font-[500] flex justify-center mt-4 text-[16px]">
          <span className="mr-1">Don't have an account? </span>
          <Link to="/auth/registration" className="font-[700] hover:underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

// const mapStateToProps = (state: any) => ({
//   isAuthenticated: state.auth.checkAuthStatus,
// });

export default LoginForm;
//export default LoginForm;
