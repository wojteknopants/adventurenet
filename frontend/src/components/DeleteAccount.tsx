import { useDispatch } from "react-redux";
import { checkIsAuthenticated, deleteUser } from "../features/auth/authSlice";
import Popup from "./Popup";
import { useState } from "react";
import Delete from "./Delete";
import { AppDispatch } from "../store";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [currentPassword, setCurrentPassword] = useState("");

  const handleOnChange = (event: any) => {
    setCurrentPassword(event.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card>
      <div className="flex justify-between border-b p-2 items-center text-mainGray">
        <p>Delete account</p>
        <button
          className="text-red-400 hover:text-red-400/80 border border-red-400 hover:border-red-400/80 rounded-lg p-1"
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
                  .then(() => dispatch(checkIsAuthenticated))
                  .then(() => navigate("/auth/login"))
              }
              className="text-red-400 border border-red-400 rounded-lg p-1"
            >
              Delete account
            </button>
          </div>
        </Popup>
      )}
    </Card>
  );
};

export default DeleteAccount;
