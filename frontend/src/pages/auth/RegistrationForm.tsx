import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loginEmail, loginLock } from "../../assets";
import { register } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import AuthForm from "../../components/AuthForm";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [re_password, setConfirmedPassword] = useState<string>("");
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

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
    if (password === re_password) {
      console.log("Password Match!");
      dispatch(register({ email, password, re_password }));
    } else {
      toast.error("Password doesn't match!");
      console.log("Password Does't Match!");
    }
  };

  useEffect(() => {
    setIsShowing(true);
  }, []);

  return (
    <AuthForm handleSubmit={handleOnSubmit}>
      <label className="flex justify-center text-[32px] font-bold mt-2 dark:text-darkWhiteText">
        Registration
      </label>
      <div className="mt-8 dark:text-darkWhiteText">
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
          className="pb-1 border-b-[1px] border-black dark:border-darkWhiteText w-[350px] bg-transparent focus:outline-none"
          required
        />
      </div>
      <div className="mt-8 dark:text-darkWhiteText">
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
          minLength={6}
          className="pb-1 border-b-[1px] border-black dark:border-darkWhiteText w-[350px] bg-transparent focus:outline-none"
          required
        />
      </div>
      <div className="mt-8 dark:text-darkWhiteText">
        {/* <label className="absolute font-semibold">Password</label> */}
        <img
          src={loginLock}
          alt="lock"
          className="absolute right-0 mr-8 mt-2"
        />
        <input
          value={re_password}
          onChange={handleConfirmPasswordChange}
          type="password"
          placeholder="Confirm password"
          className="pb-1 border-b-[1px] border-black dark:border-darkWhiteText w-[350px] bg-transparent focus:outline-none"
          required
        />
      </div>
      <div className="flex justify-center mt-8">
        <button
          type="submit"
          className="flex justify-center w-[343px] transition shadow-md shadow-blue-400/50 hover:shadow hover:shadow-blue-400/50 text-white bg-blue-400 hover:bg-blue-400/90 font-medium rounded-lg text-[16px] px-5 py-2.5"
        >
          Register
        </button>
      </div>
      <div className="font-[500] flex justify-center mt-4 text-[16px] dark:text-darkWhiteText">
        <span className="mr-1">Already have an account? </span>
        <Link to="/auth/login" className="font-[700] hover:underline">
          Login
        </Link>
      </div>
    </AuthForm>
  );
};

export default RegistrationForm;
