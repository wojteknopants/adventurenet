import Card from "./Card";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
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
import { QueryActionCreatorResult } from "@reduxjs/toolkit/dist/query/core/buildInitiate";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  QueryDefinition,
} from "@reduxjs/toolkit/dist/query";
import { EntityId } from "@reduxjs/toolkit";
import { useGetProfileQuery } from "../features/profile/profileSlice";
import Tags from "./Tags";
import {
  useAddBookmarkMutation,
  useDeleteBookmarkMutation,
} from "../features/bookmarks/bookmarksSlice";

interface PostProps {
  postData: any;
  postId: EntityId;
  refetch: () => QueryActionCreatorResult<
    QueryDefinition<
      any,
      BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
      "Post" | "ProfilePost" | "Profile" | "Comments",
      any,
      "api"
    >
  >;
}

const Post = ({ postData, postId, refetch }: PostProps) => {
  const post = postData;
  const { data: profile } = useGetProfileQuery(post.user);
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector(selectComments);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

  const [deletePost] = useDeletePostMutation();
  const [addPostLike] = useAddPostLikeMutation();
  const [deletePostLike] = useDeletePostLikeMutation();
  const [addBookmark] = useAddBookmarkMutation();
  const [deleteBookmark] = useDeleteBookmarkMutation();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [addCommentInput, setAddCommentInput] = useState<string>("");

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

  const handleOnChangeAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddCommentInput(event.target.value);
  };

  const handleOnAddClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addComment({ postId, content: addCommentInput })).then(() =>
      dispatch(fetchComments({ postId })).then(() => {
        refetch();
      })
    );

    setAddCommentInput("");
  };

  const handleSaveClick = async () => {
    if (!post.is_saved) {
      try {
        await addBookmark({
          object_id: post.id,
          content_type: "post",
        }).unwrap();
      } catch (err) {
        console.error("Failed to save the item", err);
      }
    } else {
      try {
        await deleteBookmark({
          object_id: post.id,
          content_type: "post",
        }).unwrap();
      } catch (err) {
        console.error("Failed to delete the item", err);
      }
    }

    setIsSaved((prev) => {
      // console.log(!prev);
      return !prev;
    });
  };

  const handleLikeClick = async () => {
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
      // console.log(!prev);
      return !prev;
    });
  };
  return (
    <Card noPadding={false}>
      <PostHeader
        editData={{
          postId,
          image: post.images[0]?.image || postsPlaceholder,
          content: post.content,
          tags: post.tags,
        }}
        user_pfp={profile?.profile_picture}
        user={post.user}
        created_at={post.created_at}
        onDeletePostClicked={onDeletePostClicked}
      />
      <PostContent
        image={post.images[0]?.image}
        postsPlaceholder={postsPlaceholder}
        content={post.content}
      />
      <Tags tags={post.tags} hideDelete />
      <PostFooter
        comments_count={post.comments_count}
        likes_count={post.likes_count}
        onClickShowComments={onClickShowComments}
        handleLikeClick={handleLikeClick}
        handleSaveClick={handleSaveClick}
        is_liked={post.is_liked}
        is_saved={post.is_saved}
      />
      {isCommentsOpen && <CommentsList postId={postId} comments={comments} />}
      <AddCommentForm
        input={addCommentInput}
        handleOnAddClick={handleOnAddClick}
        handleOnChangeAdd={handleOnChangeAdd}
      />
    </Card>
  );
};

export default Post;
