import Avatar from "./Avatar";
import PostLikeCounter from "./PostLikesCounter";
import { useDispatch } from "react-redux";
import {
  addCommentLike,
  deleteCommentLike,
} from "../features/posts/commentsSlice";
import { AppDispatch } from "../store";
import { formatRelativeTime } from "../lib/formatRelativeTime";
import { useGetProfileQuery } from "../features/profile/profileSlice";

interface CommentProps {
  comment: any;
  // formatRelativeTime: (arg: any) => any;
}

const Comment = ({ comment }: CommentProps) => {
  const dispatch: AppDispatch = useDispatch();

  const { data: profile } = useGetProfileQuery(comment.user);

  const handleLikeClick = (e: any) => {
    e.preventDefault();
    if (!comment.is_liked) {
      dispatch(addCommentLike({ commentId: comment.id }));
    } else {
      dispatch(deleteCommentLike({ commentId: comment.id }));
    }
  };

  return (
    <div className="flex gap-3 py-4">
      <div>
        <Avatar size={""} user_pfp={profile.profile_picture} />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex gap-3 dark:text-darkWhiteText">
          {/* {comment.user} */}
          {profile?.username ? profile?.username : profile?.user}
          <p className=" text-mainDarkGray text-sm">
            {formatRelativeTime(comment.created_at)}
          </p>
          <div className="ml-auto">
            <PostLikeCounter
              likes_count={comment.likes_count}
              is_liked={comment.is_liked}
              handleLikeClick={handleLikeClick}
            />
          </div>
        </div>
        <p className="text-sm dark:text-darkWhiteText">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;
