import Card from "./Card";
import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { parseISO } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPostById,
  useAddPostLikeMutation,
  useDeletePostLikeMutation,
  useDeletePostMutation,
} from "../features/posts/postsSlice";
import { postsPlaceholder } from "../assets";
import { AppDispatch } from "../store";
import {
  addComment,
  fetchComments,
  selectComments,
} from "../features/posts/commentsSlice";
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";
import PostFooter from "./PostFooter";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";

//{ { postId }: { postId: number }
const Post = ({ postId, refetch }: any) => {
  const post = useSelector((state) => selectPostById(state, postId));
  const [deletePost] = useDeletePostMutation();
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector(selectComments);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [addPostLike] = useAddPostLikeMutation();
  const [deletePostLike] = useDeletePostLikeMutation();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [addCommentInput, setAddCommentInput] = useState<string>("");

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
        await addPostLike({ id: post.id }).unwrap();
      } catch (err) {
        console.error("Failed to like the post", err);
      }
    } else {
      try {
        await deletePostLike({ id: post.id }).unwrap();
      } catch (err) {
        console.error("Failed to unlike the post", err);
      }
    }

    setIsLiked((prev) => {
      console.log(!prev);
      return !prev;
    });
  };

  return (
    <Card noPadding={false}>
      <PostHeader
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
          postId={postId}
          comments={comments}
          formatRelativeTime={formatRelativeTime}
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

export default Post;
