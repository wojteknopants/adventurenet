import React from "react";
import PostLikesCounter from "./PostLikesCounter";
import PostCommentsCounter from "./PostCommentsCounter";
import PostShareCounter from "./PostShareCounter";

interface PostFooterProps {
  likes_count: number;
  comments_count: number;
  is_liked: boolean;
  onClickShowComments: () => void;
  handleLikeClick: (arg: any) => void;
}

const PostFooter = ({
  likes_count,
  comments_count,
  is_liked,
  onClickShowComments,
  handleLikeClick,
}: PostFooterProps) => {
  return (
    <div className="mt-5 flex gap-3 text-mainGray text-[14px]">
      <PostLikesCounter
        likes_count={likes_count}
        handleLikeClick={handleLikeClick}
        is_liked={is_liked}
      />
      <PostCommentsCounter
        onClickShowComments={onClickShowComments}
        comments_count={comments_count}
      />
      <PostShareCounter share_count={10} />
      {/* isAddToFavorites */}
      <div className="grow text-right">
        <button className="items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="#BDBDBD"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PostFooter;
