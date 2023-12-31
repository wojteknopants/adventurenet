import { useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import EditPostForm from "./EditPostForm";
import { formatRelativeTime } from "../lib/formatRelativeTime";

interface PostHeaderProps {
  user: any;
  created_at: any;
  user_pfp: any;
  editData?: { postId: any; image: any; content: any; tags: any };
  onDeletePostClicked: () => void;
  // formatRelativeTime: (timestamp: string) => string;
}

const PostHeader = ({
  user,
  created_at,
  user_pfp,
  editData,
  onDeletePostClicked,
}: PostHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleOnEditClick = () => setIsEdited((prev) => !prev);

  return (
    <div className="flex gap-3">
      <Avatar size={""} user_pfp={user_pfp} />
      <div className="grow">
        <p>
          <Link to={`/profile/${user}`}>
            <a className="font-semibold text-md text-mainBlue">@{user}</a>
          </Link>
        </p>
        <p className="text-mainGray text-sm">
          {formatRelativeTime(created_at)}
        </p>
      </div>
      {editData &&
        (isOpen ? (
          <div className="flex gap-4 text-sm">
            <button
              onClick={() => setIsEdited((prev) => !prev)}
              className="text-mainGray rounded-lg  px-2 border-mainGray"
            >
              Edit
            </button>
            {isEdited && (
              <EditPostForm
                editData={editData}
                handleOnClick={handleOnEditClick}
              />
            )}
            <button
              className="text-red-400 rounded-lg  px-2 border-red-400"
              onClick={onDeletePostClicked}
            >
              Delete
            </button>
          </div>
        ) : (
          <button
            className=" text-mainGray"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <BsThreeDots />
          </button>
        ))}
    </div>
  );
};

export default PostHeader;
