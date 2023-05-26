import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { activation } from "../../features/auth/authSlice";
import { AppDispatch } from "../../store";

const ActivateUser = () => {
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const { token } = useParams<{ token: string }>();
  const { uid } = useParams<{ uid: string }>();

  const [verified, setVerified] = useState(false);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(uid);
    console.log(token);
    if (uid !== undefined && token !== undefined) {
      dispatch(activation({ uid, token }));
      setVerified(true);
      alert("Activation completed!");
    }
    console.log(verified);
    if (verified) {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    setIsShowing(true);
  }, []);

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleOnSubmit}
        className={`flex flex-col justify-center transition-all ease-in-out duration-500 ${
          isShowing ? "opacity-100" : "opacity-0"
        } p-6 mt-24 backdrop-blur-lg bg-white/30 rounded-[5%] shadow-md`}
      >
        <label className="flex justify-center text-[32px] font-bold mt-2">
          Activate account?
        </label>

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="flex justify-center w-[343px] transition shadow-md shadow-orange-400/50 hover:shadow hover:shadow-orange-400/50 text-white bg-orange-400 hover:bg-orange-400/90 font-medium rounded-lg text-[16px] px-5 py-2.5"
          >
            Activate
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivateUser;
