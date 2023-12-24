import Card from "../../../components/Card";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddPostLikeMutation,
  useDeletePostLikeMutation,
  useDeletePostMutation,
} from "../../../features/posts/postsSlice";
import { postsPlaceholder } from "../../../assets";
import PostHeader from "../../../components/PostHeader";
import PostContent from "../../../components/PostContent";
import PostFooter from "../../../components/PostFooter";
import AddCommentForm from "../../../components/AddCommentForm";
import { AppDispatch } from "../../../store";
import {
  addComment,
  fetchComments,
  selectComments,
} from "../../../features/posts/commentsSlice";
import CommentsList from "../../../components/CommentsList";
import { useGetProfileQuery } from "../../../features/profile/profileSlice";

const PostProfile = ({ postData, postId, refetch }: any) => {
  const post = postData;
  const [deletePost] = useDeletePostMutation();
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector(selectComments);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [addLike] = useAddPostLikeMutation();
  const [deleteLike] = useDeletePostLikeMutation();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [addCommentInput, setAddCommentInput] = useState<string>("");

  const { data } = useGetProfileQuery(post.user);

  const formatRelativeTime = (timestamp: string): string => {
    const parsedDate = parseISO(timestamp);
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  };

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  const onClickShowComments = async () => {
    dispatch(fetchComments({ postId })).then(() => {
      setIsCommentsOpen((prev) => !prev);
    });
  };

  const handleOnChangeAdd = (event: any) => {
    setAddCommentInput(event.target.value);
  };

  const handleOnAddClick = (e: any) => {
    e.preventDefault();

    dispatch(addComment({ postId, content: addCommentInput })).then(() =>
      dispatch(fetchComments({ postId })).then(() => {
        refetch();
      })
    );
    setAddCommentInput("");
  };

  const handleLikeClick = async (event: any) => {
    if (!post.is_liked) {
      try {
        await addLike({ id: post.id }).unwrap();
      } catch (err) {
        console.error("Failed to like the post", err);
      }
    } else {
      try {
        await deleteLike({ id: post.id }).unwrap();
      } catch (err) {
        console.error("Failed to unlike the post", err);
      }
    }

    setIsLiked((prev) => {
      // console.log(!prev);
      return !prev;
    });
  };

  return (
    <Card noPadding={false}>
      <PostHeader
        user_pfp={data?.profile_picture}
        user={post.user}
        created_at={post.created_at}
        onDeletePostClicked={onDeletePostClicked}
        formatRelativeTime={formatRelativeTime}
      />
      <PostContent
        image={post.images[0]?.image}
        postsPlaceholder={postsPlaceholder}
        content={post.content}
      />
      <PostFooter
        comments_count={post.comments_count}
        likes_count={post.likes_count}
        onClickShowComments={onClickShowComments}
        handleLikeClick={handleLikeClick}
        is_liked={post.is_liked}
      />
      {isCommentsOpen && (
        <CommentsList
          formatRelativeTime={formatRelativeTime}
          postId={postId}
          comments={comments}
        />
      )}
      <AddCommentForm
        input={addCommentInput}
        handleOnAddClick={handleOnAddClick}
        handleOnChangeAdd={handleOnChangeAdd}
      />
    </Card>
  );
};

export default PostProfile;
