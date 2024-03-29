import Comment from "./Comment";

interface CommentsListProps {
  comments: any;
  postId: any;
  // formatRelativeTime: (arg: any) => any;
}

const CommentsList = ({ comments, postId }: CommentsListProps) => {
  return (
    <div className="flex flex-col">
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
