import React from "react";
import Comment from "./Comment";

interface CommentsListProps {
  comments: any;
  postId: any;
  formatRelativeTime: (arg: any) => any;
}

const CommentsList = ({
  comments,
  postId,
  formatRelativeTime,
}: CommentsListProps) => {
  return (
    <div className="flex flex-col">
      {comments.map(
        (comment: any) =>
          comment.post == postId && (
            <Comment
              key={comment.id}
              comment={comment}
              formatRelativeTime={formatRelativeTime}
            />
          )
      )}
    </div>
  );
};

export default CommentsList;
