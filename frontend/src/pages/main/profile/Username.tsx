import React from "react";
import { iconSettings } from "../../../assets"; // Assuming you have an icon for editing username
import { useGetProfileQuery } from "../../../features/profile/profileSlice";

interface Props {
  user?: any;
  username: any;
  handleChangeUsername: (newUsername: any) => void;
}

const Username = ({ username, user, handleChangeUsername }: Props) => {
  const [editing, setEditing] = React.useState(false);
  const [newUsername, setNewUsername] = React.useState(username);
  const { data: profile } = useGetProfileQuery("me");

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    handleChangeUsername(newUsername);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setNewUsername(username);
    setEditing(false);
  };

  return (
    <div>
      <div className="flex items-center">
        <span className="mr-1">{editing ? "New Username:" : ""}</span>
        {editing ? (
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        ) : (
          <span></span>
        )}
        {profile?.user === user && (
          <button
            onClick={editing ? handleSaveClick : handleEditClick}
            className="flex items-center gap-1 bg-mainLightGray py-1 px-2 rounded-md shadow-md shadow-gray-500"
          >
            {/* <img src={iconSettings} alt="Edit" /> */}
            {editing ? "Save" : "Edit username"}
          </button>
        )}
        {editing && (
          <button
            onClick={handleCancelClick}
            className="ml-2 bg-mainLightGray py-1 px-2 rounded-md shadow-md shadow-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Username;

