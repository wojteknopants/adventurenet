import React from "react";
import PostLikesCounter from "./PostLikesCounter";
import PostCommentsCounter from "./PostCommentsCounter";
import PostShareCounter from "./PostShareCounter";
import PostBookmark from "./PostBookmark";

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
    <div className=" flex gap-3 text-mainGray text-[14px]">
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
      <PostBookmark />
    </div>
  );
};

export default PostFooter;
