import React from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";

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
      <div>
        <button className="text-red-400" onClick={onDeletePostClicked}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
