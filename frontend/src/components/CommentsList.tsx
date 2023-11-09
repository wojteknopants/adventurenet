import React from "react";
import Comment from "./Comment";

interface CommentsListProps {
  comments: any;
  postId: any;
}

const CommentsList = ({ comments, postId }: CommentsListProps) => {
  return (
    <div>
      {comments.map(
        (comment: any) =>
          comment.post == postId && (
            <Comment key={comment.id} comment={comment} />
          )
      )}
    </div>
  );
};

export default CommentsList;
