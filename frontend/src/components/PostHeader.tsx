import React, { useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";

interface PostHeaderProps {
  user: any;
  created_at: any;
  user_pfp: any;
  onDeletePostClicked: () => void;
  formatRelativeTime: (timestamp: string) => string;
}

const PostHeader = ({
  user,
  created_at,
  user_pfp,
  onDeletePostClicked,
  formatRelativeTime,
}: PostHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex gap-3">
      <div>
        <Avatar size={""} user_pfp={user_pfp} />
      </div>
      <div className="grow">
        <p>
          <Link to={`/profile/${user}`}>
            <a className="font-semibold">{user}</a>
          </Link>
        </p>
        <p className="text-mainDarkGray text-sm">
          {formatRelativeTime(created_at)}
        </p>
      </div>

      {isOpen ? (
        <div className="flex gap-4 text-sm">
          <button className="text-mainGray rounded-lg  px-2 border-mainGray">
            Edit
          </button>
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
      )}
    </div>
  );
};

export default PostHeader;
