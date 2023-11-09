import React from "react";

interface CommentProps {
  comment: any;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <div>
      {comment.user}
      <p>{comment.content}</p>
    </div>
  );
};

export default Comment;
