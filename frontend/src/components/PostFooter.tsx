import React from "react";
import PostLikesCounter from "./PostLikesCounter";
import PostCommentsCounter from "./PostCommentsCounter";
import PostShareCounter from "./PostShareCounter";
import PostBookmark from "./PostBookmark";

interface PostFooterProps {
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
  is_saved: boolean;
  onClickShowComments?: () => void;
  handleLikeClick?: () => void;
  handleSaveClick: () => void;
}

const PostFooter = ({
  likes_count,
  comments_count,
  is_liked,
  is_saved,
  onClickShowComments,
  handleLikeClick,
  handleSaveClick,
}: PostFooterProps) => {
  return (
    <div className=" flex gap-3 text-mainGray text-[14px]">
      {is_liked !== undefined &&
        likes_count !== undefined &&
        handleLikeClick !== undefined && (
          <PostLikesCounter
            likes_count={likes_count}
            handleLikeClick={handleLikeClick}
            is_liked={is_liked}
          />
        )}
      {comments_count !== undefined && onClickShowComments !== undefined && (
        <PostCommentsCounter
          onClickShowComments={onClickShowComments}
          comments_count={comments_count}
        />
      )}
      <PostShareCounter share_count={10} />
      <PostBookmark is_saved={is_saved} handleSaveClick={handleSaveClick} />
    </div>
  );
};

export default PostFooter;
