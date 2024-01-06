import { useDispatch } from "react-redux";
import { deleteUser } from "../features/auth/authSlice";
import Popup from "./Popup";
import { useState } from "react";
import Delete from "./Delete";
import { AppDispatch } from "../store";

const DeleteAccount = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [currentPassword, setCurrentPassword] = useState("");

  const handleOnChange = (event: any) => {
    setCurrentPassword(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex justify-between border-b p-2 items-center text-mainGray">
        <p>Delete account</p>
        <button
          className="text-red-400 border border-red-400 rounded-lg p-1"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Delete
        </button>
      </div>
      {isOpen && (
        <Popup>
          <div className="flex flex-col gap-5 ">
            <div className="flex justify-between items-center">
              <div>Are you sure?</div>
              <button onClick={() => setIsOpen((prev) => !prev)}>
                <Delete />
              </button>
            </div>
            <input
              type="password"
              placeholder="Type your password..."
              onChange={handleOnChange}
            />
            <button
              onClick={() =>
                dispatch(deleteUser({ current_password: currentPassword }))
              }
              className="text-red-400 border border-red-400 rounded-lg p-1"
            >
              Delete account
            </button>
          </div>
        </Popup>
      )}
    </>
  );
};

export default DeleteAccount;
